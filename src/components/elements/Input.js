import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';

const Input = (props) => {

    let inputWidth;
    if (props.inputWidth === undefined) { inputWidth = '80%' }
    return (
        <View style={{
            width: inputWidth,
            backgroundColor: 'white',
            borderRadius: 25,
            height: 50,
            marginBottom: 20,
            justifyContent: 'center',
            padding: 20,
            marginTop: props.mt
        }} >
            <TextInput
                editable={props.editable}
                multiline={props.multiline}
                textAlign={props.textAlign}
                keyboardType={props.keyboardType}
                numberOfLines={props.numberOfLines}
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
    inputText: {
        height: 150,
        color: 'gray',
        fontSize: 15


    }
})

export default Input