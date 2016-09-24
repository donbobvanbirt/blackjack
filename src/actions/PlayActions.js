import AppDispatcher from '../AppDispatcher';

const PlayActions = {
  newGame() {
    console.log('play button clicked!');
    AppDispatcher.dispatch({
      type: 'NEW_GAME',
      // payload: true
    })
  },

  drawCard() {
    // console.log('card drawn');
    AppDispatcher.dispatch({
      type: 'DRAW_CARD',
      // payload: true
    })
  }
}

export default PlayActions;
