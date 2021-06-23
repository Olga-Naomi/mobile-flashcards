import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { orange } from '../utils/colors';

export default function ActionButton({ children, onPress, txtStyle = {} }) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.btnText, txtStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: orange,
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: '#999'
  },
  btnText: {
    fontSize: 20
  }
});