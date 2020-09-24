import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { getStorage, authWorker, usrd, usrt } from './actionHelper';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_USER_LIST = 'GET_USER_LIST';

export const userSignUp = (username, password) => {
  return () => {
    authWorker(username, password, 'register')
      .then(e => {
        console.log(e);
        if (e === 'succes') {
          Alert.alert('Registration Succes', 'Welcome ' + username, [{
            text: "close", style: "cancel"
          }])
        }
        else {
          alert('Username already registered.')
        }
      })
  }
}

export const userLogin = (username, password) => {
  return (dispatch) => {
    authWorker(username, password, 'login')
      .then(e => {
        // console.log(e);
        if (e === 'succes') {
          dispatch({
            type: USER_LOGIN
          })
        } else if (e === true) {
          alert('Wrong Password.')
        } else {
          alert('User not found.')
        }
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