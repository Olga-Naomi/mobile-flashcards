import React, { Component } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, Platform, Animated, TouchableOpacity } from 'react-native'
import { navigationRef } from '../navigation/RootNavigation';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'
import SubmitButton from './SubmitButton'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'
import { gray, purple, orange, textGray, white, black } from '../utils/colors'
import CardFlip from 'react-native-card-flip';

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

    // AnimatedValue = 0

    // componentDidMount() {
    //     this.AnimatedValue = new Animated.Value(0)

    //     this.frontInterpolate = this.AnimatedValue.interpolate({
    //         inputRange
    //     })
    // }

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
    handleReset = () => {
        this.setState(prevState => ({
            show: screen.QUESTION,
            correct: 0,
            incorrect: 0,
            answered: Array(prevState.questionCount).fill(0)
        }))
    }
    render() {
        const { questions } = this.props.deck
        const { show } = this.state

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
                            onPress={this.handleReset}
                        >
                            Restart Quiz
                        </SubmitButton>
                        <SubmitButton
                            btnStyle={{ backgroundColor: gray, borderColor: textGray }}
                            txtStyle={{ color: textGray }}
                            onPress={() => {
                                this.handleReset()
                                navigationRef.current.goBack()
                            }}
                        >
                            Back To Deck
                        </SubmitButton>
                        <SubmitButton
                            btnStyle={{ backgroundColor: gray, borderColor: textGray }}
                            txtStyle={{ color: textGray }}
                            onPress={() => {
                                this.handleReset()
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
                {/* <CardFlip style={[styles.block, styles.questionContainer]} ref={(card) => this.card = card} >
                    <TouchableOpacity style={styles.questionContainer} onPress={() => this.card.flip()} ><Text>AB</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.questionContainer} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
                </CardFlip> */}

                {questions.map((question, idx) => (
                    <View style={styles.pageStyle} key={idx}>
                        <View style={styles.block}>
                            <Text style={styles.count}>
                                {idx + 1} / {questions.length}
                            </Text>
                        </View>
                        <View style={[styles.block, styles.questionContainer]}>
                            <Text style={styles.questionText}>
                                {show === screen.QUESTION ? 'Question' : 'Answer'}
                            </Text>
                            <View style={styles.questionWrapper}>
                                <Text style={styles.title}>
                                    {show === screen.QUESTION
                                        ? question.question
                                        : question.answer}
                                </Text>
                            </View>
                        </View>
                        {/* <View style={[styles.block, styles.questionContainer, styles.container]}>
                            <Text style={styles.questionText}>
                                {show === screen.QUESTION ? 'Question' : 'Answer'}
                            </Text>
                            <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.card, styles.card1, styles.questionWrapper]}
                                    onPress={() => { this.card.flip(); this.setState({ show: screen.ANSWER }); }}>
                                    <Text style={styles.title}>
                                        {question.question}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.card, styles.card2, styles.questionWrapper]}
                                    onPress={() => { this.card.flip(); this.setState({ show: screen.QUESTION }); }}>
                                    <Text style={styles.title}>
                                        {question.answer}
                                    </Text>
                                </TouchableOpacity>
                            </CardFlip>
                        </View> */}
                        {show === screen.QUESTION ? (
                            <ActionButton
                                txtStyle={{ color: orange }}
                                onPress={() => {this.setState({ show: screen.ANSWER }); }}
                            >
                                Tap Card to Show Answer
                            </ActionButton>
                        ) : (
                            <ActionButton
                                txtStyle={{ color: orange }}
                                onPress={() => { this.setState({ show: screen.QUESTION }); }}
                            >
                                To card to Show Question
                            </ActionButton>
                        )}
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
    /*`container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cardContainer: {
        width: 320,
        height: 470,
    },
    card: {
        width: 320,
        height: 470,
        backgroundColor: '#FE474C',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    card1: {
        backgroundColor: '#FE474C',
    },
    card2: {
        backgroundColor: '#FEB12C',
    },
    label: {
        lineHeight: 470,
        textAlign: 'center',
        fontSize: 55,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
*/

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
    questionContainer: {
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
        backgroundColor: white,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flexGrow: 1
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 20
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

const mapStateToProps = (state, { title, navigation }) => {
    const deck = state[title]
    return {
        deck
    }
}

export default connect(mapStateToProps)(QuizDetails)