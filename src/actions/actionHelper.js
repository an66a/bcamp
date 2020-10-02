import AsyncStorage from "@react-native-community/async-storage";
import CryptoJS from 'crypto-js';
// import { getFingerprint, getDevice, getDeviceId, getUniqueId, getMacAddress } from 'react-native-device-info';

const cryptoKey = 'keep-it-a-secret'; //Crypto Key
export const usrd = 'usersData'; //AsyncStorage usersData
export const usra = 'usersAccount'; //AsyncStorage usersAccount
export const usrt = 'userToken'; //AsyncStorage userToken

export const checkUserData = () => {
    return () => {
        getStorage(usra)
            .then(e => { console.log(e); })
    }
}

export const getStorage = (key) => {
    return (
        AsyncStorage.getItem(key)
            .then(e => {
                let storage = []
                if (e !== null) {
                    const decrypted = CryptoJS.AES.decrypt(e, cryptoKey);
                    const data = decrypted.toString(CryptoJS.enc.Utf8);
                    storage = JSON.parse(data) 
                }
                return storage
            })
            .catch(err => { })
    )
}

export const saveStorage = (key, value) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), cryptoKey)
    const data = encrypted.toString()
    AsyncStorage.setItem(key, data).catch(err => { console.log(err); })
}

const createUserToken = (uid) => {
    saveStorage(usrt, uid)
}

const createUserAccount = async (username, password, uid) => {
    const storage = await getStorage(usra)
    storage.push({ username, password, uid })
    saveStorage(usra, storage)
}

export const authWorker = async (username, password, uid, method) => {
    if (username === '' || password === '') {
        return
    }
    return (
        getStorage(usra)
            .then(e => {
                console.log('authworker', e);
                let result = false;
                for (let i = 0; i < e.length; i++) {
                    let user = e[i];
                    if (user.username === username) {
                        if (method === 'login') {
                            if (user.password === password) {
                                // console.log(user.uid);
                                createUserToken(user.uid)
                                result = 'succes';
                                break
                            }
                        }
                        result = true;
                    }
                }
                if (method === 'register') {
                    if (result === false) {
                        createUserAccount(username, password, uid)
                        result = 'succes';
                    }
                }
                return result;
            })
    )
}
