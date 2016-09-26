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
      PlayActions.newGame(betAmount.value);
      PlayActions.playing(true);
    }
  }

  render() {
    const { chips, playing } = this.props;
    return (
      <div>
        {numeral(chips).format('$0,0.00')}
        <form onSubmit={this._submitForm}>
          <input ref="betAmount" type="number" min='1' step='1' required/>
          <button className="btn btn-primary" disabled={playing}>Place Bet</button>
        </form>
      </div>
    )
  }
}
