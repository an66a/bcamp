import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { saveStorage, getStorage, authWorker, usrd, usrt, usra } from './actionHelper';
import { v5 as uuidv5 } from 'uuid';

const UUID_NAMESPACE = 'b2f4f3c7-4e21-456c-bce7-7af4c4494707';
const uuid = uuidv5('rnbcamp', UUID_NAMESPACE);

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_DETAIL = 'GET_USER_DETAIL';

export const userSignUp = (username, password) => {
  return () => {
    authWorker(username, password, uuid, 'register')
      .then(e => {
        // console.log(e);
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
    authWorker(username, password, null, 'login')
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
      if (e === undefined || e === null || e.length === 0) return
      dispatch({
        type: USER_LOGIN
      })
    })

  }
}

export const getUserList = () => {
  return (dispatch) => {
    getStorage(usra)
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

export const updateUserAccount = (id, data) => {
  return async (dispatch) => {
    console.log(id + '  data=', data);
    getStorage(usra)
      .then(e => {
        e.splice(id, 1)
        e.push(data)
        saveStorage(usra, e)
      })
  }
}
export const deleteUser = (id) => {
  return () => {
    console.log(id);
    getStorage(usra)
      .then(e => {
        e.splice(id, 1)
        saveStorage(usra, e)
      })
  }
}

export const getUserDetail = () => {
  return async (dispatch) => {
    const uid = await getStorage(usrt)
    const data = await getStorage(usra)
    for (let i = 0; i < data.length; i++) {
      if (uid === data[i].uid) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: data[i]
          }
        })
        break
      }
    }
  }
}

// dispatch({
//   type: GET_USER_DETAIL,
//   payload: {
//     data: e
//   }
// })