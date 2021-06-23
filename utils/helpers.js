import { AsyncStorage } from "react-native";

export const STORAGE_KEY = 'MobileFlashCards:decks'

export const decks = {
    React: {
        title: 'React',
        questions: [{
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [{
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }]
    }
}

/**
 * 
 * To manage your AsyncStorage database, you'll want to create four different helper methods.
getDecks: return all of the decks along with their titles, questions, and answers. 
getDeck: take in a single id argument and return the deck associated with that id. 
saveDeckTitle: take in a single title argument and add it to the decks. 
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
 * 
 */

export async function saveDeckTitle(title) {
    try {
        await AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        );
    } catch (err) {
        console.log(err);
    }

}

export function removeEntry(key) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[key] = undefined

            delete data[key]

            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
        .catch((e) => {
            console.error(e)
        })

}

export async function getDecks() {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        if (data === null) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
        }

        return data === null ? decks : JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
}

export async function getDeck(key) {

    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        return JSON.parse(data)[key];
    } catch (err) {
        console.log(err);
    }
}


export async function addCardToDeckAsync(key, card) {
    try {
        const deck = await getDeck(key);

        await AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    } catch (err) {
        console.log(err);
    }

}

export async function resetDecks() {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (err) {
        console.log(err);
    }
}