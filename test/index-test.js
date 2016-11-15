import React from 'react'
import { shallow, mount } from 'enzyme'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import ReactTestUtils from 'react-addons-test-utils'

import App from '../src/components/app.js'
import UserBlackjack from '../src/components/user_blackjack'
import AIBlackjack from '../src/components/ai_blackjack'

import blackjackReducer from '../src/reducers/blackjack_reducer.js'

import { fetchDeck, setAICards, setUserCards, hit } from '../src/actions/blackjack_actions'

import { createStore } from '../src/store'

const deck = {
  userCards: [],
  aiCards: [],
  deck: [
    {name:"Ace of Diamonds", value: 1},
    {name:"Ace of Spades", value: 1},
    {name:"Ace of Clubs", value: 1},
    {name:"Ace of Hearts", value: 1},
    {name:"Two of Diamonds", value: 2},
    {name:"Two of Spades", value: 2},
    {name:"Two of Clubs", value: 2},
    {name:"Two of Hearts", value: 2},
    {name:"Three of Diamonds", value: 3},
    {name:"Three of Spades", value: 3},
    {name:"Three of Clubs", value: 3},
    {name:"Three of Hearts", value: 3},
    {name:"Four of Diamonds", value: 4},
    {name:"Four of Spades", value: 4},
    {name:"Four of Clubs", value: 4},
    {name:"Four of Hearts", value: 4},
    {name:"Five of Diamonds", value: 5},
    {name:"Five of Spades", value: 5},
    {name:"Five of Clubs", value: 5},
    {name:"Five of Hearts", value: 5},
    {name:"Six of Diamonds", value: 6},
    {name:"Six of Spades", value: 6},
    {name:"Six of Clubs", value: 6},
    {name:"Six of Hearts", value: 6},
    {name:"Seven of Diamonds", value: 7},
    {name:"Seven of Spades", value: 7},
    {name:"Seven of Clubs", value: 7},
    {name:"Seven of Hearts", value: 7},
    {name:"Eight of Diamonds", value: 8},
    {name:"Eight of Spades", value: 8},
    {name:"Eight of Clubs", value: 8},
    {name:"Eight of Hearts", value: 8},
    {name:"Nine of Diamonds", value: 9},
    {name:"Nine of Spades", value: 9},
    {name:"Nine of Clubs", value: 9},
    {name:"Nine of Hearts", value: 9},
    {name:"Ten of Diamonds", value: 10},
    {name:"Ten of Spades", value: 10},
    {name:"Ten of Clubs", value: 10},
    {name:"Ten of Hearts", value: 10},
    {name:"Jack of Diamonds", value: 10},
    {name:"Jack of Spades", value: 10},
    {name:"Jack of Clubs", value: 10},
    {name:"Jack of Hearts", value: 10},
    {name:"Queen of Diamonds", value: 10},
    {name:"Queen of Spades", value: 10},
    {name:"Queen of Clubs", value: 10},
    {name:"Queen of Hearts", value: 10},
    {name:"King of Diamonds", value: 10},
    {name:"King of Spades", value: 10},
    {name:"King of Clubs", value: 10},
    {name:"King of Hearts", value: 10}
  ]
}

describe('Blackjack:', function(){
  let store

  before(function(){
    expect(createStore).toBeA('function', 'store not created')
    store = createStore(blackjackReducer)
  })

  describe('`fetchDeck()`', function(){
    it('is defined in actions', function(){
      expect(fetchDeck).toExist('fetchDeck action is not defined')
      store.dispatch(fetchDeck())
    })

    it('is an action function that returns the entire card deck from the reducer', function(){
      expect(fetchDeck).toBeA('function', 'fetchDeck is not a function')
      expect(blackjackReducer([], {type:'FETCH_DECK'}).deck).toEqual(deck.deck)
    })

    it('also returns the user and ai cards', function(){
      expect(blackjackReducer([], {type:'FETCH_DECK'}).userCards).toEqual(deck.userCards, 'could not fine userCards array')
      expect(blackjackReducer([], {type:'FETCH_DECK'}).aiCards).toEqual(deck.aiCards, 'could not find aiCards array')
    })
  })

  describe('`setAICards()`', function(){
    it('is defined in actions', function(){
      expect(setAICards).toExist('setAICards action is not defined')
      store.dispatch(setAICards(store.getState()))
    })

    it('is an action function that sets the AI cards at random through the reducer', function(){
      expect(setAICards).toBeA('function', '`setAICards()` is not a function')
      expect(setAICards(store.getState()).payload.aiCards).toBeA('array', 'payload from `setAICards()` action should include aiCards array')
      expect(setAICards(deck).payload.aiCards.length).toEqual(2, 'payload from `setAICards()` action should return updated aiCards array with two new card objects')
      expect(store.getState().aiCards.length).toEqual(2, 'did not properly set the aiCards - hint: deepclone object in setAICards()')
    })

    it('removes those two cards from the deck', function(){
      const testSetAICards = setAICards(deck)
      expect(testSetAICards.payload.deck.length).toEqual(50, 'does not remove 2 cards from deck')
      expect(testSetAICards.payload.deck).toExclude(testSetAICards.payload.aiCards[0] && testSetAICards.payload.aiCards[1], 'does not remove the proper cards from the deck')
    })
  })

  describe('`setUserCards()`', function(){
    it('is defined in actions', function(){
      expect(setUserCards).toExist('setUserCards action is not defined')
      store.dispatch(setUserCards(store.getState()))
    })

    it('is an action function that sets the User cards at random through the reducer', function(){
      expect(setUserCards).toBeA('function', '`setUserCards()` is not a function')
      expect(setUserCards(store.getState()).payload.userCards).toBeA('array', 'payload from `setUserCards()` action should include userCards array')
      expect(setUserCards(deck).payload.userCards.length).toEqual(2, 'payload from `setUserCards()` action should return updated userCards array with two new card objects')
      expect(store.getState().userCards.length).toEqual(2, 'did not properly set the userCards - hint: deepclone object in setUserCards()')
    })

    it('removes those two cards from the deck', function(){
      const testSetAICards = setUserCards(deck)
      expect(testSetAICards.payload.deck.length).toEqual(50, 'does not remove 2 cards from deck')
      expect(testSetAICards.payload.deck).toExclude(testSetAICards.payload.userCards[0] && testSetAICards.payload.userCards[1], 'does not remove the proper cards from the deck')
    })
  })

  describe('<App />', function () {
    let wrapper
    let userScore
    let aiScore

    before(function() {
      expect(App).toExist('<App /> not mounted')
      wrapper = mount(<App store={store}/>)
      userScore = wrapper.props().store.getState().userCards.reduce((prev, curr)=> {return prev + curr.value}, 0);
      aiScore = wrapper.props().store.getState().aiCards.reduce((prev, curr)=> {return prev + curr.value}, 0);
    });

    it('should have access to the store', function () {
      expect(wrapper.props().store).toNotEqual(undefined, 'The `store` does not exist in props')
      expect(wrapper.props().store).toBeA('object', 'The `store` is not an object')
      expect(wrapper.props().store.dispatch).toBeA('function', '`dispatch` is not a function')
      expect(wrapper.props().store.getState).toBeA('function', '`getState` is not a function')
      expect(wrapper.props().store.subscribe).toBeA('function', '`subscribe` is not a function')
    })

    it('should be a class based component', function(){
      expect(wrapper.name()).toEqual('App', '`App` component is not named properly')
      expect(React.Component.isPrototypeOf(App)).toEqual(true, '`App` is supposed to be class based')
    })

    it('should mount the <UserBlackjack /> component', function(){
      expect(wrapper.find(UserBlackjack).type()).toBeA('function', '`<UserBlackjack />` is not mounted properly')
    })

    it('should mount the <AIBlackjack /> component', function(){
      expect(wrapper.find(AIBlackjack).type()).toBeA('function', '`<AIBlackjack />` is not mounted properly')
    })

    it('should have a `hitMe` function', function(){
      expect(wrapper.node.hitMe).toBeA('function', '`hitMe` is not a function')
    })

    it('should have a `calculateAiScore` function which returns the sum of ai cards', function(){
      expect(wrapper.node.calculateAiScore).toBeA('function', '`calculateAiScore` is not a function')
      expect(wrapper.node.calculateAiScore()).toEqual(aiScore, '`calculateUserScore` does not return the accurate value')
    })

    it('should have a `calculateUserScore` function which returns the sum of user cards', function(){
      expect(wrapper.node.calculateUserScore).toBeA('function', '`calculateUserScore` is not a function')
      expect(wrapper.node.calculateUserScore()).toEqual(userScore, '`calculateUserScore` does not return the accurate value')
    })

    it('should have a `stay` function', function(){
      expect(wrapper.node.stay).toBeA('function', '`stay` is not a function')
    })
  })

  describe('<AIBlackjack />', function(){
    let wrapper
    let component

    before(function(){
      expect(AIBlackjack).toExist('<AIBlackjack /> not mounted')
      wrapper = mount(<AIBlackjack aiCards={store.getState().aiCards} score={function(){}}/>)
      component = shallow(<AIBlackjack aiCards={store.getState().aiCards} score={function(){}}/>)
    })

    it('should be a functional component', function(){
      expect(React.Component.isPrototypeOf(AIBlackjack)).toEqual(false, '`<AIBlackjack />` should be a functional component')
    })

    it('should have access to the store', function(){
      expect(wrapper.props().aiCards).toExist('cannot access the aiCards array as a prop')
    })

    it('should have "Computer" as a `h1` tag', function(){
      expect(component.find('h1').text()).toEqual('Computer', 'cannot find `h1` with "Computer"')
    })

    it('should have "Score: " as a `h2` tag', function(){
      expect(component.find('h2').text()).toEqual('Score: ', 'cannot find `h2` with "Score"')
    })

    it("should list out each of AI's cards as `li` inside `ul`", function(){
      expect(wrapper.find('ul').is('ul')).toEqual(true, 'does not have a `ul` tag')
      expect(wrapper.find('li').length).toEqual(2, 'does not render each card as separate `li`')
      expect(wrapper.find('ul').text()).toEqual(wrapper.props().aiCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not properly list out AI cards from state')
    })

  })

  describe('<UserBlackjack />', function(){
    let container

    before(function(){
      expect(UserBlackjack).toExist('<UserBlackjack /> not mounted')
      container = mount(<App store={store} />)
    })

    it('should be a class component', function(){
      expect(React.Component.isPrototypeOf(UserBlackjack)).toEqual(false, '`<UserBlackjack />` should be a functional component')
    })

    it('should have access to the store', function(){
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={function(){}}/>)
      expect(wrapper.props().userCards).toExist('cannot access the userCards array as a prop')
    })

    it('should have "Player1" as a `h1` tag', function(){
      const component = shallow(<UserBlackjack userCards={store.getState().userCards} score={function(){}}/>)
      expect(component.find('h1').text()).toEqual('Player1', 'cannot find `h1` with "Player1"')
    })

    it('should have "Score: " as a `h2` tag', function(){
      const component = shallow(<UserBlackjack userCards={store.getState().userCards} score={function(){}}/>)
      expect(component.find('h2').text()).toEqual('Score: ', 'cannot find `h2` with "Score"')
    })

    it("should list out each of User's cards as `li` inside `ul`", function(){
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={function(){}}/>)
      expect(wrapper.find('ul').is('ul')).toEqual(true, 'does not have a `ul` tag')
      expect(wrapper.find('li').length).toEqual(2, 'does not render each card as separate `li`')
      expect(wrapper.find('ul').text()).toEqual(wrapper.props().userCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not properly list out User cards from state')
    })

    it("should have a 'Hit Me' `button` within a `form`", function(){
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={function(){}}/>)
      expect(wrapper.find('form').findWhere(n=>n.text() === " Hit Me ").nodes[1].type).toEqual('submit', 'does not have a "Hit Me" submit `button` tag')
    })

    it("should have an onSubmit event on the 'Hit Me' `button` `form` that calls the `hitMe()` function from parent component", function(){
      const onButtonClick = createSpy()
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={function(){}} hitMe={onButtonClick}/>)
      wrapper.find('form').at(0).simulate('submit')
      expect(onButtonClick.calls.length).toEqual(1, 'does not call `hitMe` function')
    })

    it("should display new user card and re-tally score when user clicks 'Hit Me'", function(){
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={container.node.calculateUserScore} hitMe={container.node.hitMe}/>)
      let userCards = wrapper.props().userCards
      wrapper.find('form').at(0).simulate('submit')
      const wrapper2 = mount(<UserBlackjack userCards={store.getState().userCards} score={container.node.calculateUserScore} hitMe={container.node.hitMe}/>)
      let userScore = wrapper2.props().userCards.reduce((prevCard, currCard) => {return prevCard + currCard.value}, 0)
      let userScoreShow = userScore > 21 ? "BUST" : userScore
      expect(wrapper2.find('ul').text()).toEqual(wrapper2.props().userCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not render new card to page')
      expect(wrapper2.find('h2').text()).toInclude(userScoreShow, 'does not show the right score')
    })

    it("should have a 'Stay' `button` within a second `form`", function(){
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={function(){}}/>)
      expect(wrapper.find('form').findWhere(n=>n.text() === " Stay ").nodes[1].type).toEqual('submit', 'does not have a "Stay" submit `button` tag')
    })

    it("should have an onSubmit event on the 'Stay' `button` `form` that calls the `stay()` function from parent component", function(){
      const onButtonClick = createSpy()
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={function(){}} stay={onButtonClick}/>)
      wrapper.find('form').at(1).simulate('submit')
      expect(onButtonClick.calls.length).toEqual(1, 'does not call `stay` function')
    })

    it("should display new AI card and re-tally score when user clicks 'stay'", function(){
      const wrapper = mount(<UserBlackjack userCards={store.getState().userCards} score={container.node.calculateUserScore} stay={container.node.stay}/>)
      let aiCards = wrapper.props().aiCards
      wrapper.find('form').at(1).simulate('submit')
      const wrapper2 = mount(<AIBlackjack aiCards={store.getState().aiCards} score={container.node.calculateAiScore}/>)
      expect(wrapper2.find('ul').text()).toEqual(wrapper2.props().aiCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not render new card to AI page')
    })

  })
})
