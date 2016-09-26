import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';

let startingDeck = [
  {name: 'Ace of Spades', value: 11, image: '🂡'},
  {name: 'Duece of Spades', value: 2, image: '🂢'},
  {name: 'Three of Spades', value: 3, image: '🂣'},
  {name: 'Four of Spades', value: 4, image: '🂤'},
  {name: 'Five of Spades', value: 5, image: '🂥'},
  {name: 'Six of Spades', value: 6, image: '🂦'},
  {name: 'Seven of Spades', value: 7, image: '🂧'},
  {name: 'Eight of Spades', value: 8, image: '🂨'},
  {name: 'Nine of Spades', value: 9, image: '🂩'},
  {name: 'Ten of Spades', value: 10, image: '🂪'},
  {name: 'Jack of Spades', value: 10, image: '🂫'},
  {name: 'Queen of Spades', value: 10, image: '🂭'},
  {name: 'King of Spades', value: 10, image: '🂮'},

  {name: 'Ace of Hearts', value: 11, image: '🂱'},
  {name: 'Duece of Hearts', value: 2, image: '🂲'},
  {name: 'Three of Hearts', value: 3, image: '🂳'},
  {name: 'Four of Hearts', value: 4, image: '🂴'},
  {name: 'Five of Hearts', value: 5, image: '🂵'},
  {name: 'Six of Hearts', value: 6, image: '🂶'},
  {name: 'Seven of Hearts', value: 7, image: '🂷'},
  {name: 'Eight of Hearts', value: 8, image: '🂸'},
  {name: 'Nine of Hearts', value: 9, image: '🂹'},
  {name: 'Ten of Hearts', value: 10, image: '🂺'},
  {name: 'Jack of Hearts', value: 10, image: '🂻'},
  {name: 'Queen of Hearts', value: 10, image: '🂽'},
  {name: 'King of Hearts', value: 10, image: '🂾'},

  {name: 'Ace of Clubs', value: 11, image: '🃑'},
  {name: 'Duece of Clubs', value: 2, image: '🃒'},
  {name: 'Three of Clubs', value: 3, image: '🃓'},
  {name: 'Four of Clubs', value: 4, image: '🃔'},
  {name: 'Five of Clubs', value: 5, image: '🃕'},
  {name: 'Six of Clubs', value: 6, image: '🃖'},
  {name: 'Seven of Clubs', value: 7, image: '🃗'},
  {name: 'Eight of Clubs', value: 8, image: '🃘'},
  {name: 'Nine of Clubs', value: 9, image: '🃙'},
  {name: 'Ten of Clubs', value: 10, image: '🃚'},
  {name: 'Jack of Clubs', value: 10, image: '🃛'},
  {name: 'Queen of Clubs', value: 10, image: '🃝'},
  {name: 'King of Clubs', value: 10, image: '🃞'},

  {name: 'Ace of Dimonds', value: 11, image: '🃁'},
  {name: 'Duece of Dimonds', value: 2, image: '🃂'},
  {name: 'Three of Dimonds', value: 3, image: '🃃'},
  {name: 'Four of Dimonds', value: 4, image: '🃄'},
  {name: 'Five of Dimonds', value: 5, image: '🃅'},
  {name: 'Six of Dimonds', value: 6, image: '🃆'},
  {name: 'Seven of Dimonds', value: 7, image: '🃇'},
  {name: 'Eight of Dimonds', value: 8, image: '🃈'},
  {name: 'Nine of Dimonds', value: 9, image: '🃉'},
  {name: 'Ten of Dimonds', value: 10, image: 	'🃊'},
  {name: 'Jack of Dimonds', value: 10, image: '🃋'},
  {name: 'Queen of Dimonds', value: 10, image: '🃍'},
  {name: 'King of Dimonds', value: 10, image: '🃎'},
];

let _deck = [];
let _dealerHand = [];
let _playerHand = [];
let _dealerScore = 0;
let _playerScore = 0;
let _playing = false;
let _winner = '';
let _chips = 1000;
let _bet = 0;

class PlayStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'NEW_GAME':
          _deck = lodash.shuffle(startingDeck);
          _dealerHand = [];
          _playerHand = [];
          _bet = action.payload.bet;
          _chips -= _bet;
          _winner = '';
          _playerHand.push(_deck.pop());
          _dealerHand.push(_deck.pop());
          _playerHand.push(_deck.pop());
          _dealerHand.push({value: 0, image: '🂠'});
          this.calculateScore();
          if (_playerScore === 21) {
            _playing = false;
            _winner = "BLACKJACK!!!"
            _chips += _bet * 2.5;
            _bet = 0;
          }
          // console.log('chips:', _chips);
          this.emit('CHANGE');
        break;
        case 'DRAW_CARD':
          _playerHand.push(_deck.pop());
          this.calculateScore();
          this.emit('CHANGE');
        break;
        case 'PLAYING':
          _playing = action.payload.val;
          this.emit('CHANGE');
        break;
        case 'END_PLAYER_TURN':
          _playing = false;
          _dealerHand.pop();
          this.emit('CHANGE');
        break;
        case 'DEALER_HIT':
          _dealerHand.push(_deck.pop());
          this.calculateScore();
          this.emit('CHANGE');
        break;
        case 'CALCULATE_WINNER':
          this.calculateWinner();
          this.emit('CHANGE');
        break;
        case 'DOUBLE_DOWN':
          _chips -= _bet;
          _bet = _bet * 2;
          this.emit('CHANGE');
        break;
      }
    });
  }

  calculateScore() {
    var dealer = 0;
    var player = 0;

    var aces1 = 0;
    _dealerHand.forEach(card => {
      dealer += card.value;
      if (card.value === 11) {
        aces1++;
      }
    })

    while (aces1 && dealer > 21) {
      dealer -= 10;
      aces1--;
    }

    if (dealer > 21) {
      dealer = 'BUST!';
    }
    _dealerScore = dealer;

    var aces = 0;
    _playerHand.forEach(card => {
      player += card.value;
      if (card.value === 11) {
        aces++;
      }
    })

    while (aces && player > 21) {
      player -= 10;
      aces--;
    }

    if (player > 21) {
      player = 'BUST!';
      _playing = false;
      _winner = "HOUSE WINS!";
    }
    _playerScore = player;
  }

  calculateWinner() {
    if (_dealerScore > _playerScore || _playerScore === "BUST!") {
      _winner = "HOUSE WINS!";
      _bet = 0;
    } else if (_dealerScore === _playerScore) {
      _winner = "PUSH";
      _chips += _bet * 1;
      _bet = 0;
    } else {
      _winner = "YOU WON!!";
      _chips += _bet * 2;
      _bet = 0;
    }
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getDeck() {
    return _deck;
  }

  getPlayerHand() {
    return _playerHand;
  }

  getDealerHand() {
    return _dealerHand;
  }

  getPlayerScore() {
    return _playerScore
  }

  getDealerScore() {
    return _dealerScore
  }

  getPlaying() {
    return _playing
  }

  getWinner() {
    return _winner
  }

  getChips() {
    return _chips;
  }

  getBet() {
    return _bet;
  }
}

export default new PlayStore();
