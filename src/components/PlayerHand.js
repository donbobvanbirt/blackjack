import React, { Component } from 'react';

const PlayerHand = props => {
  const { hand, score } = props;
  return (
    <div>
      <h4>Hand:</h4>
      <ul>
        {hand.map((card, i) => (
          <li key={i}>{card.name}</li>
        ))}
      </ul>
      <h4>Score: {score}</h4>
    </div>
  )
}

export default PlayerHand;
