import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import CryptoJS from 'crypto-js';

const firebaseConfig = {
  apiKey: "AIzaSyA4Nk2-B-MQM9XG8lVosoEvzbyP6HPt1Tg",
  authDomain: "react-enc.firebaseapp.com",
  databaseURL: "https://react-enc.firebaseio.com",
  projectId: "react-enc",
  storageBucket: "react-enc.appspot.com",
  messagingSenderId: "492610406142",
  appId: "1:492610406142:web:adbcb7374e044fa72c87af"
};

app.initializeApp(firebaseConfig);
const db = app.database();
const auth = app.auth();
const storage = app.storage();
const cryptoKey = 'mau-tau-aja';
const usrt = 'userToken';

export const GET_MEMBER_LIST = "GET_MEMBER_LIST";
export const GET_MEMBER_DETAIL = "GET_MEMBER_DETAIL";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN = "USER_LOGIN";
export const USER_SIGNUP = "USER_SIGNUP";
export const USER_STATE = "USER_STATE";
export const STATE_CHANGED = "STATE_CHANGED";
export const USER_INPUT = "USER_INPUT";

export const saveStorage = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), cryptoKey)
  const data = encrypted.toString()
  localStorage.setItem(key, data)
}

export const userLogout = () => {
  return (dispatch) => {
    auth.signOut()
    localStorage.clear()
    window.location.reload()
  }
}
export const userInput = (id, nama, motto, gitUrl, photoUrl, update) => {
  return (dispatch) => {

    db.ref('users/data/member/' + id).once('value').then(e => {
      if (!update) {
        if (e.val() !== null) {
          alert('No. Id tidak tersedia');
          return;
        }
      }
      db.ref('users/data/member/' + id).set({ id, nama, motto, gitUrl, photoUrl })
      window.location.reload()
      // alert('sukses!')
    })
  }
}

export const stateCheck = () => {
  return (dispatch) => {
    console.log(localStorage.userToken);
    if (localStorage.userToken != null) {
      const raw = localStorage.userToken
      const decrypted = CryptoJS.AES.decrypt(raw, cryptoKey);
      const data = decrypted.toString(CryptoJS.enc.Utf8);
      const userData = JSON.parse(data)
      console.log('userState', userData);
      const role = userData.role;
      if (role === 'admin') {
        dispatch({ type: USER_STATE, payload: { admin: true, login: true, member: false, logout: false } })
        console.log('oke mimin');
      } else if (role === 'member') {
        dispatch({ type: USER_STATE, payload: { admin: false, login: true, member: true, logout: false } })
      } else {
        alert('something wrong!')
        auth.signOut()
        localStorage.clear()
      }
    }
  }
}

export const userState = () => {
  return (dispatch) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        //login  

        // let username = user.displayName;
        // db.ref('users/account/admin/' + username).once('value').then(e => {
        //   if (e.val() !== null) {
        //     dispatch({ type: USER_STATE, payload: { login: true, admin: true, member: false } })
        //   } else { dispatch({ type: USER_STATE, payload: { login: true, admin: false, meber: true } }) }
        // })
      } else {
        //logout      
        dispatch({
          type: USER_STATE,
          payload: { login: false, admin: false, member: false, logout: true }
        })
      }
    });
  }
}

export const userLogin = (username, password) => {
  return (dispatch) => {
    db.ref('users/account/admin/' + username).once('value').then(e => {
      if (e.val() !== null) {
        let email = e.val().email;
        auth.signInWithEmailAndPassword(email, password)
          .then(e => {
            let user = { username, role: "admin" }
            saveStorage(usrt, user)
            // reactUserData.push(user)
            // localStorage.reactUserData = JSON.stringify(reactUserData)
            dispatch({
              type: USER_STATE,
              payload: {
                admin: true,
                login: true,
                member: false,
                logout: false,
              }
            })
          })
          .catch(err => {
            console.log(err.code);
            switch (err.code) {
              case "auth/user-not-found":
                alert("User tidak terdaftar!");
                break;
              case "auth/wrong-password":
                alert("Kata sandi/password yang anda masukan salah.");
                break;
              case "auth/invalid-email":
                alert("Format email salah!");
                break;
              case "auth/argument-error":
                alert("Masukan alamat email!");
                break;
              default:
            }
          })

      } else {
        db.ref('users/account/member/' + username).once('value').then(e => {
          if (e.val() !== null) {
            let email = e.val().email;
            let id = e.val().id
            auth.signInWithEmailAndPassword(email, password)
              .then(e => {
                let user = { username, role: "member", id }
                saveStorage(usrt, user)
                // reactUserData.push(user)
                // localStorage.reactUserData = JSON.stringify(reactUserData)
                dispatch({
                  type: USER_STATE,
                  payload: {
                    admin: false,
                    login: true,
                    member: true,
                    logout: false,
                  }
                })
              })
              .catch(err => {
                console.log(err);
                switch (err.code) {
                  case "auth/user-not-found":
                    alert("User tidak terdaftar!");
                    break;
                  case "auth/wrong-password":
                    alert("Kata sandi/password yang anda masukan salah.");
                    break;
                  case "auth/invalid-email":
                    alert("Format email salah!");
                    break;
                  case "auth/argument-error":
                    alert("Masukan alamat email!");
                    break;
                  default:
                }
              })
          } else {
            alert('user tidak terdaftar')
          }
        })

      }
    })
  }
}

export const userSignUp = (id, email, username, password) => {
  return (dispatch) => {
    db.ref('users/account/member/' + username).once('value').then(e => {
      if (e.val() !== null) {
        alert('username tidak tersedia');
        return;
      }
      auth.createUserWithEmailAndPassword(email, password)
        .then(e => {
          console.log(e)
          db.ref('users/account/member/' + username).set({ email, id });
          var user = auth.currentUser;
          user.updateProfile({ displayName: username })
            .then(e => {
              if (e !== null) {
                alert('sukses terdaftar!');
              }
            })
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/invalid-email':
              alert('Format email salah!');
              break;
            case 'auth/weak password':
              alert('Password terlalu lemah!');
              break;
            case 'auth/email-already-in-use':
              alert('Email sudah terdaftar');
              break;
            default:
          }
        })
    })

  }
}
export const deleteUser = (id) => {
  return (dispatch) => {
    console.log('first', id);
    db.ref('users/data/member/' + id).remove()
    db.ref('users/account/member/').once('value', res =>
      res.forEach(e => {
        if (e.val().id === id) {
          db.ref('users/account/member/' + e.key).remove()
        }
      })
    )
  }
}
export const getMemberList = () => {
  return (dispatch) => {
    let resdata = []
    db.ref('users/data/member/').once('value', res => {
      res.forEach(e => {
        resdata.push(e.val())
        return
      })
      dispatch({
        type: GET_MEMBER_LIST,
        payload: {
          data: resdata,
        },
      })
    })
  }
}
export const getMemberDetail = (id) => {
  return (dispatch) => {
    let key;
    if (id) {
      key = id
    } else {
      const raw = localStorage.userToken
      if (raw === undefined) return
      const decrypted = CryptoJS.AES.decrypt(raw, cryptoKey);
      const data = decrypted.toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(data)
      key = user.id
    }
    db.ref('users/data/member/' + key).once('value').then(e => {
      // console.log(e.val());
      dispatch({
        type: GET_MEMBER_DETAIL,
        payload: {
          data: e.val(),
        },
      })
    })
      .catch(err => { console.log(err); })
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
