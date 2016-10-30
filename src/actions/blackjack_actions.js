export function fetchDeck(){

  return {
    type: 'FETCH_DECK'
  }
}

export function setAICards(game){

  return {
    type: 'SET_AI_CARDS',
    payload: game
  }
}

export function setUserCards(game){

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
