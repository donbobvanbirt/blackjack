import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';
import cards from 'cards';

// let _deck = new cards.PokerDeck();
let _deck = [
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

let _dealerHand = [];
let _playerHand = [];

class PlayStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'NEW_GAME':
          // _deck.shuffleAll();
          // console.log('deck before draw', _deck);
          // _deck.draw(4);
          // console.log('deck after draw', _deck);
          _deck = lodash.shuffle(_deck);
          this.emit('CHANGE');
          break;
        case 'DRAW_CARD':
          // _deck.draw();
          console.log('card drawn');
          _playerHand.push(_deck[_deck.length-1]);
          _deck.pop();
          this.emit('CHANGE');
          break;
      }
    });
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
}

export default new PlayStore();
