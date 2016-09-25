import React, { Component } from 'react';

import PlayStore from '../stores/PlayStore';
import PlayActions from '../actions/PlayActions';
import PlayerHand from './PlayerHand';
import DealerHand from './DealerHand';
import Winner from './Winner';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // all: PlayStore.getAll()
      deck: PlayStore.getDeck(),
      playerHand: PlayStore.getPlayerHand(),
      dealerHand: PlayStore.getDealerHand(),
      dealerScore: PlayStore.getDealerScore(),
      playerScore: PlayStore.getPlayerScore(),
      playing:  PlayStore.getPlaying()
    }
    this._onChange = this._onChange.bind(this);
    this.newGame = this.newGame.bind(this);
    this.endRound = this.endRound.bind(this);
    this.hit = this.hit.bind(this);
    // console.log('state:', this.state);
  }

  // start listening
  componentWillMount() {
    PlayStore.startListening(this._onChange)
  }

  // stop listening
  componentWillUnmount() {
    PlayStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      // all: PlayStore.getAll()
      deck: PlayStore.getDeck(),
      playerHand: PlayStore.getPlayerHand(),
      dealerHand: PlayStore.getDealerHand(),
      dealerScore: PlayStore.getDealerScore(),
      playerScore: PlayStore.getPlayerScore(),
      playing:  PlayStore.getPlaying(),
      winner: PlayStore.getWinner()
    })
    // console.log('state:', this.state);
  }

  newGame() {
    PlayActions.newGame();
    PlayActions.playing(true);
    // this.setState({
    //   playing: true
    // })

  }

  hit() {
    PlayActions.drawCard();
  }

  dealersTurn() {
    while(PlayStore.getDealerScore() < 17) {
      PlayActions.dealerHit();
    }
    PlayActions.calculateWinner();
    // console.log('dealersTurn');
  }

  endRound() {
    PlayActions.playing(false);
    this.dealersTurn();
  }

  render() {
    const { playerHand, dealerHand, playerScore, dealerScore, playing, winner } = this.state;

    return (
      <div>
        <Winner winner={winner} />
        <button className="btn btn-primary" onClick={this.newGame} disabled={playing}>New Game</button>
        <DealerHand hand={dealerHand} score={dealerScore} />
        <PlayerHand hand={playerHand} score={playerScore} />
        <button id="hitButton" className="btn btn-success" disabled={!playing} onClick={this.hit}>Hit</button>
        <button id="stayButton" className="btn btn-default" disabled={!playing} onClick={this.endRound}>Stay</button>
      </div>

    )
  }
}
