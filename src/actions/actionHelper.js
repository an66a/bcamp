import AsyncStorage from "@react-native-community/async-storage";
import CryptoJS from 'crypto-js';
import { getFingerprint, getDevice, getDeviceId, getUniqueId, getMacAddress } from 'react-native-device-info';

const cryptoKey = 'keep-it-a-secret'; //Crypto Key
export const usrd = 'usersData'; //AsyncStorage usersData
export const usrt = 'userToken'; //AsyncStorage userToken

export const checkUserData = () => {
    return () => {
        getStorage(usrd)
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

const createUserToken = async (username) => {
    let deviceId = await getDeviceId();
    let fingerprint = await getFingerprint();
    let device = await getDevice();
    let uniqueId = await getUniqueId();
    let macaddress = await getMacAddress();
    let user = { user: { username, uid: { deviceId, fingerprint, uniqueId, macaddress, device } } }
    saveStorage(usrt, user)
}

const createNewUser = async (username, password) => {
    let storage = await getStorage(usrd)
    storage.push({ username, password })
    saveStorage(usrd, storage)
}

export const authWorker = (username, password, method) => {
    if (username === '' || password === '') {
        return
    }
    return (
        getStorage(usrd)
            .then(e => {
                let result = false;
                for (let i = 0; i < e.length; i++) {
                    let user = e[i];
                    if (user.username === username) {
                        if (method === 'login') {
                            if (user.password === password) {
                                createUserToken(username)
                                return result = 'succes';
                            }
                        }
                        result = true;
                    }
                }
                if (method === 'register') {
                    if (result === false) {
                        createNewUser(username, password)
                        return result = 'succes';
                    }
                }
                return result;
            })
    )
}
