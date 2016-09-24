import React, { Component } from 'react';

import PlayGame from './PlayGame';
import Game from './Game';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <h1>Blackjack</h1>
        <PlayGame />
        <Game />
      </div>
    )
  }
}
