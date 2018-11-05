import React from 'react'
import { Component } from 'react'

import UserBlackjack from './user_blackjack'
import AIBlackjack from './ai_blackjack'
import { hitAi, hitUser } from '../actions/blackjack_actions'

class App extends Component {
  constructor(props) {
    super(props)
  }
  hitMe = (user) => {
    if (user === 'user') {
      this.props.store.dispatch(hitUser(this.props.store.getState().deck))
    } else {
      this.props.store.dispatch(hitAi(this.props.store.getState().deck))
    }
  }
  calculateAiScore = (winner) => {
    const aiScore = this.props.store.getState().aiCards.reduce((prev, current) => {
      return prev += current.value
    }, 0)
    if (aiScore > 21) {
      return 'Bust'
    } else {
      return aiScore
    }
  }
  calculateUserScore = (winner) => {
    const userScore = this.props.store.getState().userCards.reduce((prev, current) => {
      return prev += current.value
    }, 0)
    if(userScore > 21) {
      return 'Bust'
    } else if (this.calculateAiScore() === 'Bust') {
      return 'Winner'
    } else {
      return userScore
    }
  }
  stay = () => {
    if (this.calculateUserScore() !== 'Bust') {
      while (this.calculateAiScore() < this.calculateUserScore()) {
        if (this.calculateAiScore() === 'Bust') {
          return
        }
        this.hitMe('ai')
      }
    }
  }

  render() {
    return (
      <div>
        <UserBlackjack
          userCards={this.props.store.getState().userCards}
          hitMe={this.hitMe}
          score={this.calculateUserScore}
          stay={this.stay}
          calculateAiScore={this.calculateAiScore}/>
        <AIBlackjack
          aiCards={this.props.store.getState().aiCards}
          hitMe={this.hitMe}
          score={this.calculateAiScore}
          userScore={this.calculateUserScore}/>
      </div>
    )
  }
}

export default App