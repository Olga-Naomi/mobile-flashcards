import { View, Text, StyleSheet } from "react-native";
import React from 'react'
import { black, gray, white } from "../utils/colors";
import SubmitButton from "./SubmitButton";

class Deck extends React.Component {

    render() {
        const { questions, title, details, navigation } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.counter}>{questions} Cards</Text>
                {details === true && <View style={styles.buttonContainer}>
                    <SubmitButton
                        btnStyle={{ backgroundColor: white, borderColor: black }}
                        txtStyle={{ color: black }}
                        onPress={() =>
                            navigation.navigate('AddCard', { title: title })
                        }
                    >
                        Add New Card
                    </SubmitButton>
                    <SubmitButton
                        btnStyle={{ backgroundColor: black }}
                        txtStyle={{ color: white }}
                        onPress={() =>
                            navigation.navigate('Quiz', { title: title })
                        }
                    >
                        Start Quiz
                    </SubmitButton>
                </View>}
            </View>
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
        //flex: 2,
        color: black,
        fontSize: 44
    },
    counter: {
        //flex: 1,
        color: gray,
        fontSize: 32
    },
    buttonContainer: {
        padding: 20
    }

})

export default Deck