import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { getStorage, saveStorage, checkUser, usrd, usrt } from './actionHelper';
import { getFingerprint, getDevice, getDeviceId, getUniqueId, getMacAddress } from 'react-native-device-info';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_USER_LIST = 'GET_USER_LIST';

export const userSignUp = (username, password) => {
  return () => {
    checkUser(username)
      .then(e => {
        if (e !== null) {
          return alert('Username already registered.');
        }
        getStorage(usrd)
          .then(storage => {
            const user = { username, password }
            storage.push(user)
            saveStorage(usrd, storage)
            Alert.alert('Registration Succes', 'Welcome ' + username, [{
              text: "close", style: "cancel"
            }])
          })
      })
  }
}

export const userLogin = (username, password) => {
  return (dispatch) => {
    checkUser(username, password)
      .then(e => {
        if (e !== true) {
          return alert('Wrong password.')
        }
        dispatch({
          type: USER_LOGIN
        })
      })
  }
}

export const userLogout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem(usrt)
    dispatch({
      type: USER_LOGOUT
    })
  }
}

export const userState = () => {
  return (dispatch) => {
    getStorage(usrt).then(e => {
      console.log(e);
      if (e.user != null) {
        dispatch({
          type: USER_LOGIN
        })
      } else {
        console.log('user logout');
        dispatch({
          type: USER_LOGOUT
        })
      }
    })
  }
}

export const getUserList = () => {
  return (dispatch) => {
    getStorage(usrd)
      .then(e => {
        dispatch({
          type: GET_USER_LIST,
          payload: {
            data: e
          }
        })
      })
  }
}