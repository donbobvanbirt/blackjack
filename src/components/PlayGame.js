import React, { Component } from 'react';
import PlayActions from '../actions/PlayActions';

export default class PlayGame extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    // console.log('play button clicked!');
    PlayActions.newGame();
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.submit}>Play</button>
    )
  }
}
