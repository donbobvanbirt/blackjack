import React, { Component } from 'react';

const DealerHand = props => {
  const { hand, score } = props;
  return (
    <div>
      <h4>Dealer:</h4>
      <ul>
        {hand.map((card, i) => (
          <li key={i}>{card.name}</li>
        ))}
      </ul>
      <h4>Score: {score}</h4>
    </div>
  )
}

export default DealerHand;
