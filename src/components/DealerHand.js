import React, { Component } from 'react';

const DealerHand = props => {
  const { hand } = props;
  return (
    <div>
      <h4>Dealer:</h4>
      <ul>
        {hand.map((card, i) => (
          <li key={i}>{card.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default DealerHand;
