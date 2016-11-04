import React from 'react'

export default class UserBlackjack extends React.Component {

  constructor(){
    super()
    this.handleUserHit = this.handleUserHit.bind(this)
    this.handleUserStay = this.handleUserStay.bind(this)
  }

  handleUserHit(e){
    e.preventDefault()
    this.props.hitMe("user")
  }

  handleUserStay(e){
    e.preventDefault()
    this.props.stay()
  }

render(){
  return(
      <div>
        <h1>Player1</h1>
          <h2>
            Score: {this.props.score()}
          </h2>
        <ul>
          {this.props.store.getState().userCards.map((card, i) => <li key={i}>{card.name}</li>)}
        </ul>
        <form onSubmit={this.handleUserHit}>
          <button > Hit Me </button>
        </form>
        <form onSubmit={this.handleUserStay}>
          <button > Stay </button>
        </form>
      </div>

    )
  }

}
