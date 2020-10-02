import CryptoJS from 'crypto-js';


const cryptoKey = 'mau-tau-aja';
const usrt = 'bcamp.usertoken';
const usrc = 'bcamp.useraccount';
const usrd = 'bcamp.data'


export const GET_MEMBER_LIST = "GET_MEMBER_LIST";
export const GET_MEMBER_DETAIL = "GET_MEMBER_DETAIL";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN = "USER_LOGIN";
export const USER_SIGNUP = "USER_SIGNUP";
export const USER_STATE = "USER_STATE";
export const STATE_CHANGED = "STATE_CHANGED";
export const USER_INPUT = "USER_INPUT";
export const MEMBER_DATA = "MEMBER_DATA";
export const MEMBER_ACCOUNT = "MEMBER_ACCOUNT";

export const initUser = () => {
  return () => {
    if (localStorage.getItem(usrc) !== null) return
    let data = []
    let mimin = { username: 'mimin', password: 'a', role: 'admin' }
    data.push(mimin)
    saveStorage(usrc, data)
  }
}
export const saveStorage = (key, value) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), cryptoKey)
    const data = encrypted.toString()
    localStorage.setItem(key, data)
  } catch (error) {
    console.log(error);
  }

}
export const getStorage = (key) => {
  let storage = []
  let check = localStorage.getItem(key)
  if (check !== null) {
    const decrypted = CryptoJS.AES.decrypt(check, cryptoKey);
    const data = decrypted.toString(CryptoJS.enc.Utf8);
    storage = JSON.parse(data)
  }
  return storage
}

export const userLogout = () => {
  return (dispatch) => {

    localStorage.removeItem(usrt)
    window.location.reload()
  }
}

export const userInput = (id, nama, motto, gitUrl, photoUrl) => {
  return (dispatch) => {
    console.log('input');
    const data = getStorage(usrd)
    for (let i = 0; i < data.length; i++) {
      let x = data[i]
      if (x.id === id) return alert('id tidak tersedia.')
    }
    const user = { id, nama, motto, gitUrl, photoUrl }
    data.push(user)
    saveStorage(usrd, data)
    window.location.reload()
    return
  }
}

export const userUpdate = (id, nama, motto, gitUrl, photoUrl) => {
  return (dispatch) => {
    console.log('update');
    let data = getStorage(usrd)
    for (let i = 0; i < data.length; i++) {
      let x = data[i]
      if (x.id === id) {
        data.splice(i, 1)
        if (nama) {
          const user = { id, nama, motto, gitUrl, photoUrl }
          data.push(user)
          saveStorage(usrd, data)
          window.location.reload()
          dispatch({
            type: GET_MEMBER_DETAIL,
            payload: { data: null }
          })
          return
        }
        saveStorage(usrd, data)
        window.location.reload()
        dispatch({
          type: GET_MEMBER_DETAIL,
          payload: { data: null }
        })
        return
      }
    }
  }
}
export const stateCheck = () => {
  return (dispatch) => {
    // console.log(localStorage.userToken);
    if (localStorage.getItem(usrt) != null) {
      const raw = localStorage.getItem(usrt)
      const decrypted = CryptoJS.AES.decrypt(raw, cryptoKey);
      const data = decrypted.toString(CryptoJS.enc.Utf8);
      const userData = JSON.parse(data)
      console.log('userState', userData);
      const role = userData.role;
      if (role === 'admin') {
        dispatch({ type: USER_STATE, payload: { admin: true, login: true, member: false, logout: false } })
        console.log('oke mimin');
      } else if (role === 'member') {
        console.log('cek member');
        dispatch({ type: USER_STATE, payload: { admin: false, login: true, member: true, logout: false } })
      } else {
        alert('something wrong!')

        localStorage.removeItem(usrt)
      }
    } else {
      dispatch({
        type: USER_STATE,
        payload: { login: false, admin: false, member: false, logout: true }
      })
    }
  }
}



export const userLogin = (username, password) => {
  return (dispatch) => {
    let data = getStorage(usrc)
    for (let i = 0; i < data.length; i++) {
      let res = data[i]
      console.log(res.role);
      if (username === res.username && password === res.password) {
        if (res.role === 'admin') {
          console.log('admin');
          let token = { username, role: 'admin' }
          saveStorage(usrt, token)
          dispatch({
            type: USER_STATE,
            payload: { login: true, admin: true, member: false, logout: false }
          })
          return
        }
        let token = { username, role: 'member', id: res.id }
        saveStorage(usrt, token)
        console.log('member login');
        dispatch({
          type: USER_STATE,
          payload: { login: true, admin: false, member: true, logout: false }
        })
      }
    }
  }
}

export const userSignUp = (id, username, password) => {
  return (dispatch) => {
    console.log(username);
    const data = getStorage(usrc)
    for (let i = 0; i < data.length; i++) {
      let res = data[i]
      if (username === res.username || id == res.id) {
        alert('Username atau id telah terdaftar.')
        console.log('gagal daftar');
        return
      }
    }
    const user = { id, username, password }
    data.push(user)
    saveStorage(usrc, data)
    console.log('sukses daftar');
    window.location.reload()
    console.log(data);

  }
}


export const getMemberList = () => {
  return (dispatch) => {
    const data = getStorage(usrd)

    dispatch({
      type: GET_MEMBER_LIST,
      payload: {
        data: data,
      },
    })

  }
}
export const getMemberDetail = (id) => {
  return (dispatch) => {
    // const data = getStorage(usrd)

    const data = getStorage(usrt)
    let key = data.id
    if (id) {
      key = id
    }
    let detail;
    const detailData = getStorage(usrd)
    for (let i = 0; i < detailData.length; i++) {
      let res = detailData[i]
      if (res.id === key) {
        detail = res 
      }
    }
    dispatch({
      type: GET_MEMBER_DETAIL,
      payload: {
        data: detail,
      },
    })
  }
}

export const unMountMemberDetail = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_MEMBER_DETAIL,
      payload: {
        data: null,
      },
    })

  }
}
