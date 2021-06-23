import React from 'react'
import { getDecks } from "../utils/helpers";
import { connect } from 'react-redux'
import { receiveDecks } from "../actions/";
import Deck from "./Deck";
import { ScrollView, TouchableOpacity } from "react-native";
import Title from './Title';


class DeckList extends React.Component {


    componentDidMount() {

        const { dispatch } = this.props

        getDecks().then(decks => {

            dispatch(receiveDecks(decks))
        })
            .catch(error => {
                console.error('Something went wrong ', error)
            })


    }

    render() {

        const { decks, navigation } = this.props

        return (
            <ScrollView>
                      <Title defaultScreen={true} />
                {Object.keys(decks).map(deck => (
                    <TouchableOpacity  key={deck}
                    onPress={() =>
                        navigation.navigate('DeckDetails', { title: decks[deck].title})
                      }
                    >
                        <Deck
                           details = {false}
                            title={decks[deck].title}
                            questions={decks[deck].questions.length}
                        />
                    </TouchableOpacity>

                ))}

            </ScrollView>
        )
    }
}



function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)