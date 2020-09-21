import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from './elements/Input'
import { userLogin, userSignUp } from '../actions/userAction';
import { useDispatch } from 'react-redux';

const AuthComp = (props) => {
    const dispatch = useDispatch()
    const [form, set] = useState({
        username: '',
        password: '',
        repassword: ''
    });
    const reset = () => {
        set({
            username: '',
            password: '',
            repassword: ''
        })
    }
    let btn;
    let btn2;
    let sign;
    let to;
    if (props.register) {
        btn = 'SIGN UP'
        btn2 = 'LOGIN'
        sign = userSignUp;
        to = 'Login'
    } else {
        btn = 'LOGIN'
        btn2 = 'SIGN UP'
        sign = userLogin;
        to = 'Register'
    }

    const doSign = () => {
        const { username, password, repassword } = form
        if (props.repass) {
            if (username == '' || password == '' || repassword == '') {
                alert("Please fill out all fields.")
                return
            } else if (password !== repassword) {
                alert('Passwords do not match.')
                return
            }
        } else {
            if (username == '' || password == '') {
                alert("Please fill out all fields.")
                return
            }
        }
        dispatch(sign(username, password));
        reset()
    }
   
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.logo}>Just Basic</Text>
            </View>
            <Input placeholder='Username' value={form.username} set={(e) => set({ ...form, username: e })} />
            <Input placeholder='Password' value={form.password} set={(e) => set({ ...form, password: e })} scr={props.hidepass} />
            {props.repass ?
                <Input placeholder='Retype Password' value={form.repassword} set={(e) => set({ ...form, repassword: e })} scr={props.hidepass} />
                : null}
            <TouchableOpacity style={styles.inputBtn} onPress={() => doSign()}>
                <Text style={styles.btnTitle}>{btn}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBtn2} onPress={() => props.nav.navigate(to)}>
                <Text style={styles.btnTitle2}>{btn2}</Text>
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

export default AuthComp