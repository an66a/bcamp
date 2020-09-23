import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['user', 'data']
};
const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(presistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { persistor, store };
