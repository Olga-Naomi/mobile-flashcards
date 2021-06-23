export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RESET_STORE = 'RESET_STORE'


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        card,
        deckId
    }

}
export function reset() {
    return {
        type: RESET_STORE
    };
}