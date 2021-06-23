import React from 'react'
import { black, white } from "../utils/colors";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { reset } from '../actions'
import { resetDecks } from '../utils/helpers';


class Title extends React.Component {

    handleReset = () => {
        const { dispatch } = this.props

        dispatch(reset())
        resetDecks()
    }

    render() {

        const { defaultScreen } = this.props

        return (
            <View style={styles.header}>
                <View />
                <Text style={styles.title}>Mobile Flashcards</Text>
                {defaultScreen === true ? <TouchableOpacity onPress={this.handleReset}>
                    <Text>Reset</Text>
                </TouchableOpacity> :
                    <View />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: white,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        color: black,
        alignSelf: 'center'
    },

})

export default connect()(Title)