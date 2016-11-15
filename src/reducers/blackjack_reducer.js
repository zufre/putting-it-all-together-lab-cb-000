export default (state={}, action) => {
  switch (action.type) {
    case 'FETCH_DECK':
      return {
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

      case 'SET_AI_CARDS':
        return action.payload

      case 'SET_USER_CARDS':
        return action.payload

      case 'HIT_USER':
        let userState = Object.assign({}, state)
        userState.userCards = [...userState.userCards, action.payload]

        let removeUserCardIndex = userState.deck.findIndex((card)=>card===action.payload)
        userState.deck.splice(removeUserCardIndex, 1)

        return userState

      case 'HIT_AI':
        let aiState = Object.assign({}, state)
        aiState.aiCards = [...aiState.aiCards, action.payload]

        let removeAiCardIndex = aiState.deck.findIndex((card)=>card===action.payload)
        aiState.deck.splice(removeAiCardIndex, 1)

        return aiState

    default:
      return state
  }
}
