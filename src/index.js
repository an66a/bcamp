import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import  { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducer, compose(applyMiddleware(thunk)));

const firebaseConfig = {
  apiKey: "AIzaSyBYDGNqrre2oFI0xJrPqxNH0sZMIIlGfic",
  authDomain: "bcamp-81660.firebaseapp.com",
  databaseURL: "https://bcamp-81660.firebaseio.com",
  projectId: "bcamp-81660",
  storageBucket: "bcamp-81660.appspot.com",
  messagingSenderId: "835960981628",
  appId: "1:835960981628:web:8fc844c1b776b7fabbe1f9",
  measurementId: "G-22X581YQN0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
  <React.Fragment>
<Provider store={store}>
<App />

</Provider>   
  </React.Fragment>,
  document.getElementById('root')
);

