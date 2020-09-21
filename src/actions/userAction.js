import AsyncStorage from "@react-native-community/async-storage";
import CryptoJS from 'crypto-js';

import { Alert } from "react-native";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

const secretKey = 'keep-it-a-secret'

export const userSignUp = (username, password) => {
  return (dispatch) => {
    if (username === '' || password === '') {
      return;
    }
    AsyncStorage.getItem('usersData')
      .then(e => {
        console.log(e);
        let usersData = []
        if (e !== null) {
          const data = CryptoJS.AES.decrypt(e, secretKey);
          const decrypted = data.toString(CryptoJS.enc.Utf8);
          usersData = JSON.parse(decrypted)
        }
        for (let i = 0; i < usersData.length; i++) {
          let usd = usersData[i]
          if (usd.username == username) {
            alert('Username already redgistered.')
            return;
          }
          
        }
        const user = { username, password }
        usersData.push(user)
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(usersData), secretKey)
        const string = encrypted.toString()
        AsyncStorage.setItem('usersData', string)
        Alert.alert('Registration Succes', 'Welcome ' + username, [{
          text: "close", style: "cancel"
        }])

      })

  }
}

export const userLogin = (username, password) => {
  return (dispatch) => {
    AsyncStorage.getItem('usersData')
      .then(async (e) => {
        console.log(e);
        let usersData = []
        if (e !== null) {
          const data = CryptoJS.AES.decrypt(e, secretKey);
          const decrypted = data.toString(CryptoJS.enc.Utf8);
          usersData = JSON.parse(decrypted)
        }
        for (let i = 0; i < usersData.length; i++) {
          let usd = usersData[i]
          if (usd.username == username) {
            if (usd.password == password) {
              dispatch({
                type: USER_LOGIN
              })
              AsyncStorage.setItem('user', username)
              let user = await AsyncStorage.getItem('user')
              console.log('user: ' + user);
              return
            } else {
              alert('Wrong password')
            }
            return
          }
        }
        for (let i = 0; i < usersData.length; i++) {
          let usd = usersData[i]
          if (usd.username != username) {
            alert('User not registered')
            return
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.removeItem('user')
    let user = await AsyncStorage.getItem('user')
    console.log('user: ' + user);
    dispatch({
      type: USER_LOGOUT
    })
  }
}

export const userState = () => {
  return async (dispatch) => {
    AsyncStorage.getItem('user')
    let user = await AsyncStorage.getItem('user')
    if (user !== null) {
      console.log('user: ' + user);
      dispatch({
        type: USER_LOGIN
      })
    } else {
      console.log('user logout');
      dispatch({
        type: USER_LOGOUT
      })
    }

  }
}