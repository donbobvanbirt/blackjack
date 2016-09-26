import AppDispatcher from '../AppDispatcher';

const PlayActions = {
  newGame(bet) {
    // console.log('play button clicked!');
    AppDispatcher.dispatch({
      type: 'NEW_GAME',
      payload: { bet }
    })
    console.log('bet', bet)
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

  endPlayerTurn() {
    AppDispatcher.dispatch({
      type: 'END_PLAYER_TURN'
    })
  },

  calculateWinner() {
    AppDispatcher.dispatch({
      type: 'CALCULATE_WINNER'
    })
  },


}

export default PlayActions;
