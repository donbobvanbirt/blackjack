import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';
import cards from 'cards';

// let _deck = new cards.PokerDeck();
let startingDeck = [
  {name: 'Ace of Spades', value: 11, image: 0},
  {name: 'Duece of Spades', value: 2, image: 0},
  {name: 'Three of Spades', value: 3, image: 0},
  {name: 'Four of Spades', value: 4, image: 0},
  {name: 'Five of Spades', value: 5, image: 0},
  {name: 'Six of Spades', value: 6, image: 0},
  {name: 'Seven of Spades', value: 7, image: 0},
  {name: 'Eight of Spades', value: 8, image: 0},
  {name: 'Nine of Spades', value: 9, image: 0},
  {name: 'Ten of Spades', value: 10, image: 0},
  {name: 'Jack of Spades', value: 10, image: 0},
  {name: 'Queen of Spades', value: 10, image: 0},
  {name: 'King of Spades', value: 10, image: 0},

  {name: 'Ace of Hearts', value: 11, image: 0},
  {name: 'Duece of Hearts', value: 2, image: 0},
  {name: 'Three of Hearts', value: 3, image: 0},
  {name: 'Four of Hearts', value: 4, image: 0},
  {name: 'Five of Hearts', value: 5, image: 0},
  {name: 'Six of Hearts', value: 6, image: 0},
  {name: 'Seven of Hearts', value: 7, image: 0},
  {name: 'Eight of Hearts', value: 8, image: 0},
  {name: 'Nine of Hearts', value: 9, image: 0},
  {name: 'Ten of Hearts', value: 10, image: 0},
  {name: 'Jack of Hearts', value: 10, image: 0},
  {name: 'Queen of Hearts', value: 10, image: 0},
  {name: 'King of Hearts', value: 10, image: 0},

  {name: 'Ace of Clubs', value: 11, image: 0},
  {name: 'Duece of Clubs', value: 2, image: 0},
  {name: 'Three of Clubs', value: 3, image: 0},
  {name: 'Four of Clubs', value: 4, image: 0},
  {name: 'Five of Clubs', value: 5, image: 0},
  {name: 'Six of Clubs', value: 6, image: 0},
  {name: 'Seven of Clubs', value: 7, image: 0},
  {name: 'Eight of Clubs', value: 8, image: 0},
  {name: 'Nine of Clubs', value: 9, image: 0},
  {name: 'Ten of Clubs', value: 10, image: 0},
  {name: 'Jack of Clubs', value: 10, image: 0},
  {name: 'Queen of Clubs', value: 10, image: 0},
  {name: 'King of Clubs', value: 10, image: 0},

  {name: 'Ace of Dimonds', value: 11, image: 0},
  {name: 'Duece of Dimonds', value: 2, image: 0},
  {name: 'Three of Dimonds', value: 3, image: 0},
  {name: 'Four of Dimonds', value: 4, image: 0},
  {name: 'Five of Dimonds', value: 5, image: 0},
  {name: 'Six of Dimonds', value: 6, image: 0},
  {name: 'Seven of Dimonds', value: 7, image: 0},
  {name: 'Eight of Dimonds', value: 8, image: 0},
  {name: 'Nine of Dimonds', value: 9, image: 0},
  {name: 'Ten of Dimonds', value: 10, image: 0},
  {name: 'Jack of Dimonds', value: 10, image: 0},
  {name: 'Queen of Dimonds', value: 10, image: 0},
  {name: 'King of Dimonds', value: 10, image: 0},
];

let _deck = [];
let _dealerHand = [];
let _playerHand = [];
let _dealerScore = 0;
let _playerScore = 0;
let _playing = false;
let _winner = '';

class PlayStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'NEW_GAME':
          _deck = lodash.shuffle(startingDeck);
          _dealerHand = [];
          _playerHand = [];
          _winner = '';
          _dealerHand.push(_deck.pop());
          _dealerHand.push(_deck.pop());
          _playerHand.push(_deck.pop());
          _playerHand.push(_deck.pop());
          this.calculateScore();
          // console.log('dealerScore:', _dealerScore, 'playerScore', _playerScore);
          this.emit('CHANGE');
        break;
        case 'DRAW_CARD':
          // console.log('card drawn');
          _playerHand.push(_deck.pop());
          this.calculateScore(_playerScore);
          // console.log('dealerScore:', _dealerScore, 'playerScore', _playerScore);
          this.emit('CHANGE');
        break;
        case 'PLAYING':
          _playing = action.payload.val;
          this.emit('CHANGE');
        break;
        case 'DEALER_HIT':
          _dealerHand.push(_deck.pop());
          this.calculateScore(_dealerScore);
          // console.log('the house is hitting');
          this.emit('CHANGE');
        break;
        case 'CALCULATE_WINNER':

          // console.log('calculating winner');
          this.calculateWinner();
          console.log(_winner);
          this.emit('CHANGE');
        break;
      }
    });
  }

  calculateScore(score) {
    var dealer = 0;
    var player = 0;

    var aces = 0;
    _dealerHand.forEach(card => {
      dealer += card.value;
    })
    //
    // while (aces && dealer > 21) {
    //   dealer -= 10;
    //   aces--;
    // }

    if (dealer > 21) {
      dealer = 'BUST!';
    }
    _dealerScore = dealer;


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
    if (_dealerScore > _playerScore) {
      _winner = "HOUSE WINS!";
    } else if (_dealerScore === _playerScore) {
      _winner = "PUSH";
    } else {
      _winner = "YOU WON!!";
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

  // getAll() {
  //   let all = {
  //     deck: _deck,
  //     dealerHand: _dealerHand,
  //     playerHand: _playerHand,
  //     dealerScore: _dealerScore,
  //     playerScore: _playerScore
  //   }
  //   return all;
  // }

}

export default new PlayStore();
