import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { white, pink, purple } from '../utils/colors'


export default class Card extends React.Component {

    state = {
        show: this.props.screen.QUESTION
    }

    componentWillMount() {

        this.AnimatedValue = new Animated.Value(0)
        this.value

        this.AnimatedValue.addListener(({ value }) => {
            this.value = value
        })

        this.frontInterpolate = this.AnimatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        this.backInterpolate = this.AnimatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

    }

    flipCard = () => {


        if (this.value >= 90) {
            this.setState({ show: this.props.screen.QUESTION })
            Animated.spring(this.AnimatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()
        } else {
            this.setState({ show: this.props.screen.ANSWER })
            Animated.spring(this.AnimatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()
        }

    }

    render() {


        const frontAnimatedStyle = {
            transform: [
                { rotateX: this.frontInterpolate }
            ]
        }

        const backAnimatedStyle = {
            transform: [
                { rotateX: this.backInterpolate }
            ]
        }
        const { show } = this.state
        const { question } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.title}>{question.question}</Text>
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipBack]}>
                        <Text style={styles.title}>{question.answer}</Text>
                    </Animated.View>
                </View>
                <TouchableOpacity onPress={() => this.flipCard()} style={styles.btn}>
                    {show === 'question' ? <Text style={styles.btnText}>Tap here to show Answer</Text>
                        : <Text style={styles.btnText}>Tap here to show Question</Text>}
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    questionContainer: {
        backgroundColor: white,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipCard: {
        backfaceVisibility: 'hidden',
        width: 400,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pink
    },
    flipBack: {
        backgroundColor: purple,
        top: 0,
        position: 'absolute'
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: "200",
        color: white
    },
    btn: {
        padding: 20,
        marginTop: 20
    },
    btnText: {
        fontWeight: '400',
        fontSize: 18
    }
})

