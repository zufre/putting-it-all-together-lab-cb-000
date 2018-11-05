export function fetchDeck() {
  return {
    type: 'FETCH_DECK'
  }
}

export function setAICards(currentDeck) {
  let newDeck = JSON.parse(JSON.stringify(currentDeck))
  for(let i = 0; i < 2; i++) {
    const cardIdx = Math.floor(Math.random() * newDeck.deck.length)
    newDeck.aiCards.push(newDeck.deck[cardIdx])
    newDeck.deck.splice(cardIdx, 1)
  }
  return {
    type: 'SET_AI_CARDS',
    payload: newDeck
  }
}

export function setUserCards(currentDeck) {
  let newDeck = JSON.parse(JSON.stringify(currentDeck))
  for(let i = 0; i < 2; i++) {
    const cardIdx = Math.floor(Math.random() * newDeck.deck.length)
    newDeck.userCards.push(newDeck.deck[cardIdx])
    newDeck.deck.splice(cardIdx, 1)
  }
  return {
    type: 'SET_USER_CARDS',
    payload: newDeck
  }
}

export function hitAi(currentDeck) {
  const cardIdx = Math.floor(Math.random() * currentDeck.length)
  const newDeck = currentDeck[cardIdx]

  return {
    type: 'HIT_AI',
    payload: newDeck
  }
}

export function hitUser(currentDeck) {
  const cardIdx = Math.floor(Math.random() * currentDeck.length)
  const newDeck = currentDeck[cardIdx]

  return {
    type: 'HIT_USER',
    payload: newDeck
  }
}
