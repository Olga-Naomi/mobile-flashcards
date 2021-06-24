import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { white } from '../utils/colors'

export default function TextButton({ children, onPress, style = {}, disabled }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.btn}>
                <Text style={[styles.text, style]}>{children}</Text>
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: white,
    },
    btn:{
        width: 300,
        height: 50,
        justifyContent: `center`,
        alignItems: `center`,
    }
})