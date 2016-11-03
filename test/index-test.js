import React from 'react';
import { shallow, mount } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import ReactTestUtils from 'react-addons-test-utils'

import App from '../src/components/app.js';
import UserBlackjack from '../src/components/user_blackjack';
import AIBlackjack from '../src/components/ai_blackjack';

import blackjackReducer from '../src/reducers/blackjack_reducer.js';

import { fetchDeck, setAICards, setUserCards, hit } from '../src/actions/blackjack_actions';

import { createStore } from '../src/store';

const store = createStore(blackjackReducer);

store.dispatch(fetchDeck())
store.dispatch(setAICards(store.getState()))
store.dispatch(setUserCards(store.getState()))

describe('<App />', function () {
  it('should have access to the store', function () {
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.props().store).toNotEqual(undefined, 'The `store` does not exist in props');
    expect(wrapper.props().store).toBeA('object', 'The `store` is not an object');
    expect(wrapper.props().store.dispatch).toBeA('function', '`dispatch` is not a function');
    expect(wrapper.props().store.getState).toBeA('function', '`getState` is not a function');
    expect(wrapper.props().store.subscribe).toBeA('function', '`subscribe` is not a function');
  });

  it('should be a class based component', function(){
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.name()).toEqual('App', '`App` component is not named properly')
    expect(React.Component.isPrototypeOf(App)).toEqual(true, '`App` is supposed to be class based')
  })

  it('should mount the <UserBlackjack /> component', function(){
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.find(UserBlackjack).type()).toBeA('function', '`<UserBlackjack />` is not mounted properly')
  })

  it('should mount the <AIBlackjack /> component', function(){
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.find(AIBlackjack).type()).toBeA('function', '`<AIBlackjack />` is not mounted properly')
  })
})

describe('<AIBlackjack />', function(){
  it('should be a functional component', function(){
    expect(React.Component.isPrototypeOf(AIBlackjack)).toEqual(false, '`<AIBlackjack />` should be a functional component')
  })

  it('should have access to the store', function(){
    const wrapper = mount(<AIBlackjack store={store} score={function(){}}/>);
    expect(wrapper.props().store).toExist('cannot access the store as a prop')
  })

  it('should have "Computer" as a `h1` tag', function(){
    const component = shallow(<AIBlackjack store={store} score={function(){}}/>);
    expect(component.find('h1').text()).toEqual('Computer', 'cannot find `h1` with "Computer"')
  })

  it('should have "Score: " as a `h2` tag', function(){
    const component = shallow(<AIBlackjack store={store} score={function(){}}/>);
    expect(component.find('h2').text()).toEqual('Score: ', 'cannot find `h2` with "Score"')
  })

  it("should list out each of AI's cards as `li` inside `ul`", function(){
    const wrapper = mount(<AIBlackjack store={store} score={function(){}}/>);
    expect(wrapper.find('ul').is('ul')).toEqual(true, 'does not have a `ul` tag')
    expect(wrapper.find('li').length).toEqual(2, 'does not render each card as separate `li`')
    expect(wrapper.find('ul').text()).toEqual(wrapper.props().store.getState().aiCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not properly list out AI cards from state')
  })


})

describe('<UserBlackjack />', function(){
  it('should be a class component', function(){
    expect(React.Component.isPrototypeOf(UserBlackjack)).toEqual(true, '`<UserBlackjack />` should be a functional component')
  })

  it('should have access to the store', function(){
    const wrapper = mount(<UserBlackjack store={store} score={function(){}}/>);
    expect(wrapper.props().store).toExist('cannot access the store as a prop')
  })

  it('should have "Player1" as a `h1` tag', function(){
    const component = shallow(<UserBlackjack store={store} score={function(){}}/>);
    expect(component.find('h1').text()).toEqual('Player1', 'cannot find `h1` with "Player1"')
  })

  it('should have "Score: " as a `h2` tag', function(){
    const component = shallow(<UserBlackjack store={store} score={function(){}}/>);
    expect(component.find('h2').text()).toEqual('Score: ', 'cannot find `h2` with "Score"')
  })

  it("should list out each of User's cards as `li` inside `ul`", function(){
    const wrapper = mount(<UserBlackjack store={store} score={function(){}}/>);
    expect(wrapper.find('ul').is('ul')).toEqual(true, 'does not have a `ul` tag')
    expect(wrapper.find('li').length).toEqual(2, 'does not render each card as separate `li`')
    expect(wrapper.find('ul').text()).toEqual(wrapper.props().store.getState().userCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not properly list out User cards from state')
  })

  it("should have a 'Hit Me' `button` within a `form`", function(){
    const wrapper = mount(<UserBlackjack store={store} score={function(){}}/>);
    expect(wrapper.find('form').findWhere(n=>n.text() === " Hit Me ").nodes[1].type).toEqual('submit', 'does not have a "Hit Me" submit `button` tag')
  })

  it("should have an onSubmit event on the 'Hit Me' `button` `form` that calls the `hitMe()` function from parent component", function(){
    const onButtonClick = createSpy();
    const wrapper = mount(<UserBlackjack store={store} score={function(){}} hitMe={onButtonClick}/>);
    wrapper.find('form').at(0).simulate('submit')
    expect(onButtonClick.calls.length).toEqual(1, 'does not call `hitMe` function')
  })

  it("should display new user card and re-tally score when user clicks 'Hit Me'", function(){
    const container = mount(<App store={store} />)
    const wrapper = mount(<UserBlackjack store={store} score={container.node.calculateUserScore} hitMe={container.node.hitMe}/>);
    let userCards = wrapper.props().store.getState().userCards
    wrapper.find('form').at(0).simulate('submit')
    const wrapper2 = mount(<UserBlackjack store={store} score={container.node.calculateUserScore} hitMe={container.node.hitMe}/>);
    let userScore = userCards.reduce((prevCard, currCard) => {return prevCard + currCard.value}, 0)
    let userScoreShow = userScore > 21 ? "BUST" : userScore
    expect(wrapper2.find('ul').text()).toEqual(wrapper2.props().store.getState().userCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not render new card to page')
    expect(wrapper2.find('h2').text()).toInclude(userScoreShow, 'does not show the right score')
  })

  it("should have a 'Stay' `button` within a second `form`", function(){
    const wrapper = mount(<UserBlackjack store={store} score={function(){}}/>);
    expect(wrapper.find('form').findWhere(n=>n.text() === " Stay ").nodes[1].type).toEqual('submit', 'does not have a "Stay" submit `button` tag')
  })

  it("should have an onSubmit event on the 'Stay' `button` `form` that calls the `stay()` function from parent component", function(){
    const onButtonClick = createSpy();
    const wrapper = mount(<UserBlackjack store={store} score={function(){}} stay={onButtonClick}/>);
    wrapper.find('form').at(1).simulate('submit')
    expect(onButtonClick.calls.length).toEqual(1, 'does not call `stay` function')
  })

  it("should display new AI card and re-tally score when user clicks 'stay'", function(){
    const container = mount(<App store={store} />)
    const wrapper = mount(<UserBlackjack store={store} score={container.node.calculateUserScore} stay={container.node.stay}/>);
    let aiCards = wrapper.props().store.getState().aiCards
    wrapper.find('form').at(1).simulate('submit')
    const wrapper2 = mount(<AIBlackjack store={store} score={container.node.calculateAiScore}/>);
    expect(wrapper2.find('ul').text()).toEqual(wrapper2.props().store.getState().aiCards.reduce((prev, curr)=> {return prev + curr.name}, ''), 'does not render new card to AI page')
  })

})
