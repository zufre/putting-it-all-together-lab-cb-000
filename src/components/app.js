import React from 'react';
import UserBlackjack from './user_blackjack';
import AIBlackjack from './ai_blackjack';
import { hit } from '../actions/blackjack_actions';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.hitMe = this.hitMe.bind(this)
    this.calculateAiScore = this.calculateAiScore.bind(this)
    this.calculateUserScore = this.calculateUserScore.bind(this)
    this.aiHitorStay = this.aiHitorStay.bind(this)
  }

  hitMe(user){
    if (user === "user") {
      const gameState = this.props.store.getState()
      const randIndex = Math.floor(Math.random() * gameState.deck.length)
      gameState.userCards.push(gameState.deck[randIndex])
      gameState.deck.splice(randIndex, 1);

      this.props.store.dispatch(hit(gameState))
    }else {
      const gameState = this.props.store.getState()
      const randIndex = Math.floor(Math.random() * gameState.deck.length)
      gameState.aiCards.push(gameState.deck[randIndex])
      gameState.deck.splice(randIndex, 1);

      this.props.store.dispatch(hit(gameState))
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

  aiHitorStay(){
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
        <UserBlackjack store={this.props.store} hitMe={this.hitMe} score={this.calculateUserScore} aiHitorStay={this.aiHitorStay} calculateAiScore={this.calculateAiScore} />
        <AIBlackjack store={this.props.store} hitMe={this.hitMe} score={this.calculateAiScore} userScore={this.calculateUserScore} />

      </div>
    )
  }
}
