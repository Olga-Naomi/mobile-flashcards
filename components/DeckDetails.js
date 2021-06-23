import { View } from "react-native";
import React from 'react'
import { connect } from "react-redux";
import Deck from "./Deck";


class DeckDetails extends React.Component {
    render() {

        const { deck, navigation } = this.props;
        console.log('deck', deck)

        const { title, questions } = deck

        return (
            <View>
                <Deck questions={questions.length} title={title} details={true} navigation={navigation} />
            </View>
        )
    }
}

function mapStateToProps(state, { route }) {
    const { title } = route.params;
    const deck = state[title]
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckDetails)