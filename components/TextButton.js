import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function TextButton({ children, onPress,style = {}, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Text style={[styles.submit, style]}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    submit: {
      textAlign: 'center',
      color: white,
    }
  }) 