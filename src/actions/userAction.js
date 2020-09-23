import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { getStorage, saveStorage, checkUser, usrd, usrt } from './actionHelper';

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
          .catch(err => { })
      })
      .catch(err => { })
  }
}

export const userLogin = (username, password) => {
  return (dispatch) => {
    checkUser(username, password)
      .then(e => {
        console.log(e);
        if (e !== 'match') {
          return alert('Wrong password.')
        }
        dispatch({ type: USER_LOGIN })
        saveStorage(usrt, username)
      })
      .catch(err => { })
    // let usersData = await getStorage('usersData')
    // for (let i = 0; i < usersData.length; i++) {
    //   let usd = usersData[i]
    //   if (usd.username == username) {
    //     if (usd.password == password) {
    //       dispatch({
    //         type: USER_LOGIN
    //       })
    //       AsyncStorage.setItem('user', username)
    //       let user = AsyncStorage.getItem('user')
    //       console.log('user: ' + user);
    //       return
    //     } else {
    //       alert('Wrong password')
    //     }
    //     return
    //   }
    // }
    // for (let i = 0; i < usersData.length; i++) {
    //   let usd = usersData[i]
    //   if (usd.username != username) {
    //     alert('User not registered')
    //     return
    //   }
    // }

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
  return async (dispatch) => {
    let user = await AsyncStorage.getItem('user')
    // console.log(user);
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
export const getUserList = () => {
  return (dispatch) => {
    AsyncStorage.getItem('usersData')
      .then(e => {
        var userData = JSON.parse(e)
        dispatch({
          type: GET_USER_LIST,
          payload: {
            data: userData
          }
        })
      })
  }
}