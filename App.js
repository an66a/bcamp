import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import AppScreen from './src/screens/AppScreen';
import SQLite from 'react-native-sqlite-storage';
import 'react-native-gesture-handler';

global.db = SQLite.openDatabase({name : "albumSql.db", createFromLocation : 1}, () => {console.log('SQLite connected');},  err => {console.log(err)});

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppScreen />
    </PersistGate>
  </Provider>
  )
}

export default App
