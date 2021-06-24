/**
 * Reference: https://github.com/james-priest/mobile-flashcards
 */


import React, { Component } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, Platform } from 'react-native'
import { navigationRef } from '../navigation/RootNavigation';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'
import { gray, purple, orange, textGray, white, black } from '../utils/colors'
import Card from './Card';

const screen = {
    QUESTION: 'question',
    ANSWER: 'answer',
    RESULT: 'result'
}
const answer = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect'
}

const SCREEN_WIDTH = Dimensions.get('window').width



class QuizDetails extends Component {

    state = {
        show: screen.QUESTION,
        correct: 0,
        incorrect: 0,
        questionCount: this.props.deck.questions.length,
        answered: Array(this.props.deck.questions.length).fill(0)
    }

    handleScroll = () => {
        this.setState({
            show: screen.QUESTION
        })
    }

    handleAnswer = (response, page) => {
        if (response === answer.CORRECT) {
            this.setState(prevState => ({ correct: prevState.correct + 1 }))
        } else {
            this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }))
        }
        this.setState(
            prevState => ({
                answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
            }),
            () => {
                const { correct, incorrect, questionCount } = this.state

                if (questionCount === correct + incorrect) {
                    this.setState({ show: screen.RESULT })
                } else {
                    this.scrollView.scrollTo({ x: (page + 1) * SCREEN_WIDTH })
                    this.setState(prevState => ({
                        show: screen.QUESTION
                    }))
                }
            }
        )
    }

    reset = () => {
        this.setState(prevState => ({
            show: screen.QUESTION,
            correct: 0,
            incorrect: 0,
            answered: Array(prevState.questionCount).fill(0)
        }))
    }
    render() {
        const { questions } = this.props.deck

        if (questions.length === 0) {
            return (
                <View style={styles.pageStyle}>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            <Ionicons
                                name={Platform.OS === "ios" ? "ios-sad" : "md-sad"}
                                size={100}
                            />
                        </Text>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Please add some cards first
                        </Text>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            to start quiz
                        </Text>
                    </View>
                </View>
            )
        }

        if (this.state.show === screen.RESULT) {

            clearLocalNotification().then(setLocalNotification)

            const { correct, questionCount } = this.state
            const percent = ((correct / questionCount) * 100).toFixed(0)
            const resultStyle =
                percent >= 70 ? styles.resultTextGood : styles.resultTextBad

            return (
                <View style={styles.pageStyle}>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Quiz Complete!
                        </Text>
                        <Text style={resultStyle}>
                            {correct} / {questionCount} correct
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Percentage correct
                        </Text>
                        <Text style={resultStyle}>{percent}%</Text>
                    </View>
                    <View>
                        <SubmitButton
                            btnStyle={{ backgroundColor: white, borderColor: black }}
                            onPress={this.reset}
                        >
                            Restart Quiz
                        </SubmitButton>
                        <SubmitButton
                            btnStyle={{ backgroundColor: gray, borderColor: textGray }}
                            txtStyle={{ color: textGray }}
                            onPress={() => {
                                this.reset()
                                navigationRef.current.goBack()
                            }}
                        >
                            Back To Deck
                        </SubmitButton>
                        <SubmitButton
                            btnStyle={{ backgroundColor: gray, borderColor: textGray }}
                            txtStyle={{ color: textGray }}
                            onPress={() => {
                                this.reset()
                                navigationRef.current.navigate('Home')
                            }}
                        >
                            Home
                        </SubmitButton>
                    </View>
                </View>
            )
        }

        return (
            <ScrollView
                style={styles.container}
                pagingEnabled={true}
                horizontal={true}
                onMomentumScrollBegin={this.handleScroll}
                ref={scrollView => {
                    this.scrollView = scrollView
                }}
            >
                {questions.map((question, idx) => (
                    <View style={styles.pageStyle} key={idx}>
                        <View style={styles.block}>
                            <Text style={styles.count}>
                                {idx + 1} / {questions.length}
                            </Text>
                        </View>
                        <Card question={question} screen={screen} />
                        <View>
                            <SubmitButton
                                btnStyle={{ backgroundColor: white, borderColor: black }}
                                onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                                disabled={this.state.answered[idx] === 1}
                            >
                                Correct
                            </SubmitButton>
                            <SubmitButton
                                btnStyle={{ backgroundColor: black }}
                                txtStyle={{ color: white }}
                                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                                disabled={this.state.answered[idx] === 1}
                            >
                                Wrong
                            </SubmitButton>
                        </View>
                    </View>
                ))}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pageStyle: {
        flex: 1,
        justifyContent: 'space-around',
        width: SCREEN_WIDTH
    },
    block: {
        marginBottom: 20
    },
    count: {
        fontSize: 24
    },
    title: {
        fontSize: 32,
        textAlign: 'center'
    },
    resultTextGood: {
        color: purple,
        fontSize: 30,
        textAlign: 'center'
    },
    resultTextBad: {
        color: orange,
        fontSize: 30,
        textAlign: 'center'
    }
})

const mapStateToProps = (state, { title }) => {
    const deck = state[title]
    return {
        deck
    }
}

export default connect(mapStateToProps)(QuizDetails)