import React, { Component } from 'react';

import Game from './Game';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <h1>Blackjack</h1>
        <Game />
      </div>
    )
  }
}
