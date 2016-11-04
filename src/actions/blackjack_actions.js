export function fetchDeck(){

  return {
    type: 'FETCH_DECK'
  }
}

export function setAICards(game){
  let gameClone = JSON.parse(JSON.stringify(game))

  for (var i = 0; i < 2; i++) {
    const randIndex = Math.floor(Math.random() * gameClone.deck.length)
    gameClone.aiCards.push(gameClone.deck[randIndex])
    gameClone.deck.splice(randIndex, 1)
  }

  return {
    type: 'SET_AI_CARDS',
    payload: gameClone
  }
}

export function setUserCards(game){
  let gameClone = JSON.parse(JSON.stringify(game))

  for (var i = 0; i < 2; i++) {
    const randIndex = Math.floor(Math.random() * gameClone.deck.length)
    gameClone.userCards.push(gameClone.deck[randIndex])
    gameClone.deck.splice(randIndex, 1)
  }

  return {
    type: 'SET_USER_CARDS',
    payload: gameClone
  }
}

export function hit(game){

  return {
    type: 'HIT',
    payload: game
  }
}
