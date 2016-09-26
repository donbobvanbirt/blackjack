import React, { Component } from 'react';

import PlayStore from '../stores/PlayStore';
import PlayActions from '../actions/PlayActions';
import PlayerHand from './PlayerHand';
import DealerHand from './DealerHand';
import Winner from './Winner';
import StartGame from './StartGame';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: PlayStore.getDeck(),
      playerHand: PlayStore.getPlayerHand(),
      dealerHand: PlayStore.getDealerHand(),
      dealerScore: PlayStore.getDealerScore(),
      playerScore: PlayStore.getPlayerScore(),
      playing:  PlayStore.getPlaying(),
      chips: PlayStore.getChips(),
      bet: PlayStore.getBet()
    }
    this._onChange = this._onChange.bind(this);
    this.endRound = this.endRound.bind(this);
    this.hit = this.hit.bind(this);
    this.doubleDown = this.doubleDown.bind(this);
  }

  componentWillMount() {
    PlayStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    PlayStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      deck: PlayStore.getDeck(),
      playerHand: PlayStore.getPlayerHand(),
      dealerHand: PlayStore.getDealerHand(),
      dealerScore: PlayStore.getDealerScore(),
      playerScore: PlayStore.getPlayerScore(),
      playing:  PlayStore.getPlaying(),
      winner: PlayStore.getWinner(),
      chips: PlayStore.getChips(),
      bet: PlayStore.getBet()
    })
  }

  hit() {
    PlayActions.drawCard();
  }

  dealersTurn() {
    while(PlayStore.getDealerScore() < 17) {
      PlayActions.dealerHit();
    }
    PlayActions.calculateWinner();
  }

  endRound() {
    PlayActions.endPlayerTurn();
    this.dealersTurn();
  }

  doubleDown() {
    PlayActions.doubleDown();
    this.hit();
    this.endRound();
  }

  render() {
    const { playerHand, dealerHand, playerScore, dealerScore, playing, winner, chips, bet } = this.state;

    return (
      <div>
        <DealerHand hand={dealerHand} score={dealerScore} />
        <PlayerHand hand={playerHand} score={playerScore} />
        <StartGame chips={chips} newGame={this.newGame} playing={playing} bet={bet}/>
        <button id="hitButton" className="btn btn-success" disabled={!playing} onClick={this.hit}>Hit</button>
        <button id="stayButton" className="btn btn-default" disabled={!playing} onClick={this.endRound}>Stand</button>
        <button id="dubbleDownButton" className="btn btn-warning" disabled={!playing} onClick={this.doubleDown}>Dubble Down</button>
        <Winner winner={winner} />
      </div>

    )
  }
}
