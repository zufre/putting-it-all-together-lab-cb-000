export function fetchDeck(){

  return {
    type: 'FETCH_DECK'
  }
}

export function setAICards(game){

  for (var i = 0; i < 2; i++) {
    const randIndex = Math.floor(Math.random() * game.deck.length)
    game.aiCards.push(game.deck[randIndex])
    game.deck.splice(randIndex, 1);
  }

  return {
    type: 'SET_AI_CARDS',
    payload: game
  }
}

export function setUserCards(game){

  for (var i = 0; i < 2; i++) {
    const randIndex = Math.floor(Math.random() * game.deck.length)
    game.userCards.push(game.deck[randIndex])
    game.deck.splice(randIndex, 1);
  }

  return {
    type: 'SET_USER_CARDS',
    payload: game
  }
}

export function hit(game){

  return {
    type: 'HIT',
    payload: game
  }
}
