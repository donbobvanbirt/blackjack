import React, { Component } from 'react';

const PlayerHand = props => {
  const { hand, score } = props;
  return (
    <div>
      <div className="cards">
        {hand.map((card, i) => ( card.image ))}
      </div>
      <h4>Your score: {score}</h4>
    </div>
  )
}

export default PlayerHand;
