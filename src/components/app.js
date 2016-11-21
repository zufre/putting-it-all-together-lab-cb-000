import React, { Component } from 'react'
import UserBlackjack from './user_blackjack'
import AIBlackjack from './ai_blackjack'
import { hitAi, hitUser } from '../actions/blackjack_actions'

export default class App extends Component {
  constructor(props){
    super(props)
    this.hitMe = this.hitMe.bind(this)
    this.calculateAiScore = this.calculateAiScore.bind(this)
    this.calculateUserScore = this.calculateUserScore.bind(this)
    this.stay = this.stay.bind(this)
  }

  hitMe(user){
    if (user === "user") {
      this.props.store.dispatch(hitUser(this.props.store.getState().deck))
    }else {
      this.props.store.dispatch(hitAi(this.props.store.getState().deck))
    }
  }

  calculateAiScore(winner){
    const aiScore = this.props.store.getState().aiCards.reduce((preVal, currVal) => {
                      return preVal += currVal.value
                    }, 0)
    if (aiScore > 21) {
      return "BUST"
    }else {
      return aiScore
    }
  }

  calculateUserScore(winner){
    const userScore = this.props.store.getState().userCards.reduce((preVal, currVal) => {
            return preVal += currVal.value
          }, 0)
    if (userScore > 21) {
      return "BUST"
    }else if (this.calculateAiScore() === "BUST") {
      return "Winner!"
    }else{
      return userScore
    }
  }

  stay(){
    if (this.calculateUserScore() !== "BUST") {
      while (this.calculateAiScore() < this.calculateUserScore()) {
        if (this.calculateAiScore() === "BUST") {
          return
        }
        this.hitMe("ai")
      }
    }
  }

  render(){
    return(
      <div>
        <UserBlackjack userCards={this.props.store.getState().userCards} hitMe={this.hitMe} score={this.calculateUserScore} stay={this.stay} calculateAiScore={this.calculateAiScore} />
        <AIBlackjack aiCards={this.props.store.getState().aiCards} hitMe={this.hitMe} score={this.calculateAiScore} userScore={this.calculateUserScore} />

      </div>
    )
  }
}
