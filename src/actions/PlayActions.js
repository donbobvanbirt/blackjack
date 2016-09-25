import AppDispatcher from '../AppDispatcher';

const PlayActions = {
  newGame() {
    // console.log('play button clicked!');
    AppDispatcher.dispatch({
      type: 'NEW_GAME'
    })
  },

  drawCard() {
    // console.log('card drawn');
    AppDispatcher.dispatch({
      type: 'DRAW_CARD'
    })
  },

  dealerHit() {
    AppDispatcher.dispatch({
      type: 'DEALER_HIT'
    })
  },

  playing(val) {
    AppDispatcher.dispatch({
      type: 'PLAYING',
      payload: { val }
    })
  },

  calculateWinner() {
    AppDispatcher.dispatch({
      type: 'CALCULATE_WINNER'
    })
  }
}

export default PlayActions;
