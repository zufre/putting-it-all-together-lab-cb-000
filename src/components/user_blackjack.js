import React from 'react'

const UserBlackjack = (props) => {
  return (
    <div>
      <h1>Player1</h1>
      <h2>Score: {props.score()}</h2>
      <ul>
        {props.userCards.map((card, i) => <li key={i}>{card.name}</li>)}
      </ul>

      <form onSubmit={(ev) => {
        ev.preventDefault()
        props.hitMe('user')
      }}>
        <button> Hit Me </button>
      </form>

      <form onSubmit={(ev) => {
        ev.preventDefault()
        props.stay('user')
      }}>
        <button> Stay </button>
      </form>
    </div>
  )
}

export default UserBlackjack