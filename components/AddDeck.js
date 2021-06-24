import { View, Text, StyleSheet } from "react-native";
import React, { Fragment } from 'react'
import { black, white } from "../utils/colors";
import TextButton from "./TextButton";
import { TextInput } from "react-native-gesture-handler";
import { connect } from 'react-redux'
import { addDeck } from "../actions";
import { saveDeckTitle } from "../utils/helpers";
import Title from './Title';


class AddDeck extends React.Component {

    state = {
        text: ''
    }

    handleChange = text => this.setState({ text })


    submit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        console.log(this.props)
        const { text } = this.state
        const title = text

        if (text !== '') {
            dispatch(addDeck(title))
            saveDeckTitle(title)
                .catch(error => console.error(`Something went wrong ${error}`))

            this.toDetails(title)
        } else {
            alert(`Deck name can't be Empty`)
        }

    }

    toDetails = (title) => {

        this.props.navigation.navigate('DeckDetails', { title: title })

        this.setState(() => ({ text: '' }));
    }

    render() {
        const { title } = this.state
        return (
            <Fragment>
                <Title />
                <View style={styles.container}>
                    <Text style={styles.title}>What is the title of your new Deck?</Text>
                    <View style={{ height: 50 }} />
                    <TextInput style={styles.input}
                        onChangeText={this.handleChange}
                        value={title}
                        placeholder='Enter the name of the New Deck here'
                        autoFocus={true} />
                    <View style={{ height: 50 }} />
                    <TextButton style={styles.button} onPress={this.submit} disabled={title === ''}>
                        Create Deck
                    </TextButton>
                </View>
            </Fragment>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        //borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    title: {
        paddingTop: 10,
        textAlign: 'center',
        color: black,
        fontSize: 44
    },
    button: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    input: {
        borderBottomWidth: 1,
        borderColor: black,
        backgroundColor: white,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 15,
        height: 40,
        width: 300,
        marginBottom: 20,
    }

})

export default connect()(AddDeck)