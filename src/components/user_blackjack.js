import React from 'react'

export default (props) => {

  return(
      <div>
        <h1>Player1</h1>
        <h2>Score: {props.score()}</h2>
        <ul>
          {props.userCards.map((card, i) => <li key={i}>{card.name}</li>)}
        </ul>

        <form onSubmit={(e)=>{
          e.preventDefault()
          props.hitMe("user")
        }}>
          <button > Hit Me </button>
        </form>

        <form onSubmit={(e)=>{
          e.preventDefault()
          props.stay()
        }}>
          <button > Stay </button>
        </form>

      </div>

    )

}
