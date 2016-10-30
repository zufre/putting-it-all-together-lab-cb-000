import React from 'react';

export default class AIBlackjack extends React.Component {

render(){
  return(
      <div>
        <h1>Computer</h1>
        <h2>Score: {this.props.score()}</h2>
        <ul>
          {this.props.store.getState().aiCards.map((card, i) => <li key={i}>{card.name}</li>)}
        </ul>

      </div>
    )
  }

}
