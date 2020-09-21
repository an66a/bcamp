import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'crypto-js';

const encrypt = createTransform(
    
    (inboundState, key) => {
      if (!inboundState) return inboundState;
      console.log(inboundState);
      const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), 'rahasia');
  
      return cryptedText.toString(); 
    },
    (outboundState, key) => {
      if (!outboundState) return outboundState;
      const bytes = CryptoJS.AES.decrypt(outboundState, 'rahasia');
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      console.log('out: ' + decrypted);
      return JSON.parse(decrypted);
     
    }
  );
const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    transforms: [encrypt],
    whitelist: ['user', 'data']
};
const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(presistedReducer, compose(
    applyMiddleware(thunk),
    ),
    );
const persistor = persistStore(store);
export { persistor, store };