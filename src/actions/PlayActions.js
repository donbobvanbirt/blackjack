import AppDispatcher from '../AppDispatcher';

const PlayActions = {
  newGame(bet) {
    AppDispatcher.dispatch({
      type: 'NEW_GAME',
      payload: { bet }
    })
  },

  drawCard() {
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

  doubleDown() {
    AppDispatcher.dispatch({
      type: 'DOUBLE_DOWN'
    })
  }
}

export default PlayActions;
