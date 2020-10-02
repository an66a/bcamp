import {
    createStore, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import CryptoJS from 'crypto-js';

// const inBound = (state) => {
//     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(state), 'creepy')
//     const data = encrypted.toString()
//     localStorage.setItem('bcamp.student:state', data);
// }

// const outBound = () => {
//     const state = localStorage.getItem('bcamp.student:state');
//     if (state === null) return undefined;
//     const decrypted = CryptoJS.AES.decrypt(state, 'creepy');
//     const data = decrypted.toString(CryptoJS.enc.Utf8);
//     return JSON.parse(data);
// }
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const presistedState = outBound();
const store = createStore(
    reducer,
    // presistedState,
    compose(applyMiddleware(thunk)),
);
// store.subscribe(() => inBound(store.getState()));
export { store }