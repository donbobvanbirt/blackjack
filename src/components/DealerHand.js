import React, { Component } from 'react';

const DealerHand = props => {
  const { hand, score } = props;
  return (
    <div>
      {/* <h4>Dealer:</h4> */}
      <div className="cards">
        {hand.map((card, i) => ( card.image ))}
      </div>
      <h4>Dealer: {score}</h4>
    </div>
  )
}

export default DealerHand;
