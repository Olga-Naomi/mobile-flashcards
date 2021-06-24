import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/index'
import { white, black } from '../utils/colors'
import { addCardToDeckAsync } from '../utils/helpers'
import SubmitButton from './SubmitButton'

export class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }
  handleQuestionChange = question => {
    this.setState({ question })
  }

  handleAnswerChange = answer => {
    this.setState({ answer })
  }

  handleSubmit = () => {
    const { addCard, title, navigation } = this.props

    console.log(this.props)

    const card = {
      question: this.state.question,
      answer: this.state.answer
    }

    addCard(title, card)
    addCardToDeckAsync(title, card)

    this.setState({ question: '', answer: '' })
    navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a New Card</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder='Question'
              autoFocus={true}
              returnKeyType='next'
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder='Answer'
              ref={input => {
                this.answerTextInput = input
              }}
              returnKeyType='go'
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <SubmitButton
            btnStyle={{ backgroundColor: white, borderColor: black }}
            onPress={this.handleSubmit}
            disabled={this.state.question === '' || this.state.answer === ''}
          >
            Submit
          </SubmitButton>
        </View>
        <View style={{ height: '30%' }} />
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
  block: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: black,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: black,
    backgroundColor: white,
    padding: 10,
    borderRadius: 5,
    fontSize: 15,
    height: 40,
    width: 300,
  }
})

const mapStateToProps = (state, { route }) => {
  const { title } = route.params
  return {
    title
  }
}

export default connect(mapStateToProps, { addCard })(AddCard)