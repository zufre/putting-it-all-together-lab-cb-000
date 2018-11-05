import React from 'react'

const AIBlackjack = (props) => {
  return (
    <div>
      <h1>Computer</h1>
      <h2>Score: {props.score()}</h2>
      <ul>
        {props.aiCards.map((card, i) => <li key={i}>{card.name}</li>)}
      </ul>
    </div>
  )
}

export default AIBlackjack