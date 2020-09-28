import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../components/elements/Input'
import { deleteUser, userState } from '../actions/userAction'
import { useDispatch } from 'react-redux';


const Debug = () => {
    const dispatch = useDispatch()
    const id = ''
    const doTest = (id) => {
        dispatch(deleteUser(id))
    }
    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity style={styles.inputBtn} onPress={() => doTest(id)}>
                <Text style={styles.btnTitle}>Test</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ffc3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marginB: {
        marginBottom: 10
    },
    marginText: {
        marginTop: 20,
        color: 'black'
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#00a2ff',
        marginBottom: 50
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnTitle2: {
        color: '#00a2ff',
        fontWeight: 'bold',
    },
    inputBtn: {
        width: '80%',
        backgroundColor: '#00a2ff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    inputBtn2: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    }

})

export default Debug
