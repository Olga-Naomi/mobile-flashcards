import { ADD_DECK, RECEIVE_DECKS, ADD_CARD, RESET_STORE } from "../actions/";
import { decks as INITIAL_STATE } from "../utils/helpers";


export function reducer(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            const { deck } = action;
            const title = deck
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            };
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: [...state[deckId].questions].concat(card)
                }
            };
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state
    }
}