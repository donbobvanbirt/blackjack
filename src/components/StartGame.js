import React, { Component } from 'react';
import numeral from 'numeral';

import PlayActions from '../actions/PlayActions';

export default class StartGame extends Component {
  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const { betAmount } = this.refs;

    if (betAmount.value > this.props.chips) {
      alert("You do not have enough money for that!");
    } else {
      PlayActions.playing(true);
      PlayActions.newGame(betAmount.value);
    }
  }

  render() {
    const { chips, playing, bet } = this.props;
    return (
      <div>
        <h5>Bet: {numeral(bet).format('$0,0.00')}</h5>
        <h5>Chips in hand: {numeral(chips).format('$0,0.00')}</h5>
        <form onSubmit={this._submitForm}>
          <input ref="betAmount" type="number" min='1' step='1' required/>
          <br/>
          <button className="btn btn-primary" disabled={playing}>Place Bet</button>
          <hr width="60%"/>
        </form>
      </div>
    )
  }
}
