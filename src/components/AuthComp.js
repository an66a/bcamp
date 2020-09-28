import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from './elements/Input'
import { userLogin, userSignUp } from '../actions/userAction';
import { checkUserData } from '../actions/actionHelper';
import { useDispatch } from 'react-redux';

const AuthComp = (props) => {    
    initialState = {
        username: '',
        password: '',
        repassword: '',    
      }
    const [state, set] = useState(initialState);
    const { username, password, repassword } = state;
    const dispatch = useDispatch();
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
        if (props.repass) {
            if (username === '' || password === '' || repassword === '') {
                alert("Please fill out all fields.")
                return
            } else if (password !== repassword) {
                alert('Passwords do not match.')
                return
            }
        } else {
            if (username === '' || password === '') {
                alert("Please fill out all fields.")
                return
            }
        }
        dispatch(sign(username, password), set(initialState));        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.logo}>Just Basic</Text>
            </View>
            <Input placeholder='Username' value={username} set={(e) => set({ ...state, username: e })} />
            <Input placeholder='Password' value={password} set={(e) => set({ ...state, password: e })} scr={props.hidepass} />
            {props.repass ?
                <Input placeholder='Retype Password' value={repassword} set={(e) => set({ ...state, repassword: e })} scr={props.hidepass} />
                : null}
            <TouchableOpacity style={styles.inputBtn} onPress={() => doSign()}>
                <Text style={styles.btnTitle}>{btn}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBtn2} onPress={() => props.nav.navigate(to)} delayLongPress={1500} onLongPress={() => set({ ...state, showUsers: true })}>
                <Text style={styles.btnTitle2}>{btn2}</Text>
            </TouchableOpacity>
            {state.showUsers ?
                <TouchableOpacity style={styles.inputBtn2} onPress={() => dispatch(checkUserData())}>
                    <Text style={styles.btnTitle2}>Log User Account</Text>
                </TouchableOpacity>
                : null}
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