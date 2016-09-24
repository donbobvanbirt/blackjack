import AppDispatcher from '../AppDispatcher';

const PlayActions = {
  newGame() {
    console.log('play button clicked!');
    AppDispatcher.dispatch({
      type: 'NEW_GAME',
    })
  },

  drawCard() {
    // console.log('card drawn');
    AppDispatcher.dispatch({
      type: 'DRAW_CARD',
    })
  },

  playing(val) {
    AppDispatcher.dispatch({
      type: 'PLAYING',
      payload: { val }
    })
  }
}

export default PlayActions;
