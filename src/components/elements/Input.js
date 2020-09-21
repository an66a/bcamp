import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';

const Input = (props) => {
    return (
        <View style={styles.inputView} >
            <TextInput
                style={styles.inputText}
                value={props.value}
                secureTextEntry={props.scr}
                placeholder={props.placeholder}
                onChangeText={(el) => props.set(el)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },
    inputText: {
        height: 50,
        color: 'gray',

    }
})

export default Input