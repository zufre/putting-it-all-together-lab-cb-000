# putting-it-all-together-lab

## Objectives

1. Build out a full blackjack game!

## Instructions

Build out a functional blackjack game with all that we've learned about React, Flux and Redux. Use the tests as a guideline, but, also, test your code in browser by running `npm start`!

## Resources

[Stack Overflow on Deep Clone](http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object#answer-10869248)

# Putting it all together - Blackjack

Build a Flux implementation of a blackjack game!

## Objectives

* Build a working version of blackjack using Flux patterns
* Store application state in one central store
* Use class based and functional components
* Update state via user interaction with your components by following the Flux pattern

## Instructions

Your goal is to build a version of Blackjack. In our version of the game, a user should be able to click a button, "hit me", to get a new card dealt to them. When they click this button, they will be dealt a new random card from the deck and their total points will reflect their total card value.

A user will be able to "hit me" as many times as they want until they click a button called "stay" or their total card value goes over 21. The "stay" button should cause the AI player to play their turn as if they were a user (call the same "hit me" functionality to continue adding cards). The AI player should no longer "hit me" when their value exceeds the User's total value.

A user wins if they have a greater value than the AI player after the AI player takes their turn or if the AI player looses by exceeding 21 points. The user loses if they exceed 21 points or if the AI player has a greater total value that is not greater than 21.

Clone down this lab, run `npm install` and `npm test` to get started. This is a complicated assignment, so read the instructions below very carefully.

### Things to Think About

We need a state object that can keep track of the following:

* Total deck of cards
* User's cards
* AI player's card

Your initial state should therefore look something like this (already provided in the reducer):

```js
const initialState = {
  game: {
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
}

```

### Step 1: Buid the Store, Reducer and Action Creators

First thing's first, bring in a `store.js` from a past readme or lab (bonus points if you can write out the entire store without help). Import the `createStore` function to our `App.js` file and create a store with the provided `blackjack_reducer`. We will come back to building out the rest of our reducer.

####Actions

In our actions folder we already have an empty file created to hold all of our actions called `blackjack_actions.js`. We will be building out five different actions to handle our user interaction and game logic:

* `fetchDeck`
* `setAICards`
* `setUserCards`
* `hitAI`
* `hitUser`

The `fetchDeck` action should:

* Be called during the initial load of our application
* Just tell our reducer to return the full game object already provided in our `blackjack_reducer` (Note: This action should not need a `payload` key-value pair, only `type`)

The `setAICards` and `setUserCards` actions should:

* Be called during the intial load of our application
* Take in an argument of just our `deck` object, which is nested inside `state`
* Use the `deck` object to select two random cards from it
* Return an object with a `type` key that tells our `blackjack_reducer` what to do and a `payload` key that is an array of the two card objects obtained

The `hitAI` and `hitUser` actions should:

* Take in an argument of just our `deck` object
* Use the `deck` object to select one random card from it
* Return an object with a `type` key that tells our `blackjack_reducer` what to do and a `payload` key that is the one card object obtained

###Reducer

The reducer should be able to respond to the actions listed above. We already have the reducer case statement built out for the `fetchDeck` action.

The reducer should respond to the `setAiCards` and `setUserCards` actions by:

* Creating a new clone of the `state` object
* Dealing the two cards received from the action to the AI or User card collection
* Removing the two cards from the state's deck property
* Returning a new copy of game state with the new AI or User's card collection and the updated deck collection (with the two cards you dealt from it having been removed)

The reducer should respond to the `hitAI` and `hitUser` actions by:

* Creating a new clone of the `state` object
* Dealing the card received from the action to the AI or User card collection
* Removing the card from the state's deck property
* Returning a new copy of game state with the new AI or User's card collection and the updated deck collection (with the new card you dealt from it having been removed)

### Step 2: Building The Components

We'll be using both Class based components and functional components to build our application. Build a top level Class based component, `App`, that receives a `prop` key of `store` to pull the game info from state.

`App` will render two child components:

* `userBlackjack`
* `aiBlackjack`

`userBlackjack` is a functional component that renders the following info:

* display the text "Player1" in a `<h1>` tag
* display the user total in a `<h2>` tag
* display the user's cards as `<li>` tags inside one `<ul>` tag
* display a form with a button that has the text of "hit me"
	* This button will trigger an `onSubmit` action that should call a function defined in the `App` class
* display another form with a button that has the text of "stay"
	* This button will trigger an `onSubmit` action that should call a function defined in the `App` class

`aiBlackjack` is a functional component that renders the following info:

* display the text "Computer" in a `<h1>` tag
* display the ai total in a `<h2>` tag
* display the ai's cards as `<li>` tags inside one `<ul>` tag

The `App` component should have four functions defined:

* `hitMe`
* `calculateAIScore`
* `calculateUserScore`
* `stay`

The `hitMe` function checks if the user is calling the function or the ai and dispatches either the `hitUser` or `hitAI` action based on which was called. This will need to be passed down to `userBlackjack` as props.

The `calculateAIScore` function uses the data in state to calculate the AI's current card total. This will need to be passed down to `aiBlackjack` as props.

The `calculateUserScore` function uses the data in state to calculate the User's current card total. This will need to be passed down to `userBlackjack` as props.

The `stay` function will grab the AI's score and User's score to determain whether or not the AI will have to call on `hit me`. This will need to be apssed down to `userBlackjack` as props.

Pass `hitMe` to `userBlackjack` under a prop of `hitMe`; pass `calculateUserScore` to `userBlackjack` under a prop of `score`; pass `stay` to `userBlackjack` under a prop of `stay` and pass `calculateAIScore` to `aiBlackjack` under a prop of `score`.

The `stay` method should determine whether or not there is a winner. To do so think about the following:

* The user wins if they have a point total that is greater than the AI's, but less than or equal to 21, after `stay` is clicked.
* The computer wins if they have a point total that is greater than the User's, but less than or equal to 21, after `stay` is clicked.

**Note:** Remember to wrap your `ReactDOM.render` function in a `render` method that then subscribes to the `store.subscribe` function.