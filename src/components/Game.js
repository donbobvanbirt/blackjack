import React, { Component } from 'react';

import PlayStore from '../stores/PlayStore';
import PlayActions from '../actions/PlayActions';
import PlayerHand from './PlayerHand';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: PlayStore.getDeck(),
      playerHand: PlayStore.getPlayerHand(),
      dealerHand: PlayStore.getDealerHand()
    }
    this._onChange = this._onChange.bind(this);
    console.log('state:', this.state);
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
      deck: PlayStore.getDeck()
    })
    console.log('state:', this.state);
  }

  hit() {
    // console.log('held', );
    PlayActions.drawCard();
    // console.log("held", this.state.deck.held);
  }

  render() {
    const { playerHand } = this.state;

    // const { held } = this.state.deck;
    // console.log('state', this.state);
    // console.log('held', held);
    // // let hand = () => {
    // //   for (var i in held) {
    // //     return (
    // //       <li>{held[i].value}</li>
    // //     )
    // //   }
    // // }
    // let hand;
    //
    // if (held) {
    //   hand = held.map((card) => {
    //     return (
    //       <li>{card.value}</li>
    //     )
    //   })
    // }

    return (
      <div>
        <button className="btn btn-success" onClick={this.hit}>Hit</button>
        <PlayerHand hand={playerHand}/>
      </div>

    )
  }
}
