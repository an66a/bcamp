import React from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';
import MainApp from './src/screens/MainApp';
import SQLite from 'react-native-sqlite-storage';
import 'react-native-gesture-handler';

global.db = SQLite.openDatabase({name : "albumSql.db", createFromLocation : 1}, () => {console.log('SQLite connected');},  err => {console.log(err)});

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
  </Provider>
  )
}

export default App
