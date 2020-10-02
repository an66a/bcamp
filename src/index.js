import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import  { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';

const store = createStore(reducer, compose(applyMiddleware(thunk)));
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const firebaseConfig = {
  apiKey: "AIzaSyBScGSmtSjQIhTlDpg35thgBlU7te5R760",
  authDomain: "react-2-b3d9b.firebaseapp.com",
  databaseURL: "https://react-2-b3d9b.firebaseio.com",
  projectId: "react-2-b3d9b",
  storageBucket: "react-2-b3d9b.appspot.com",
  messagingSenderId: "76072993496",
  appId: "1:76072993496:web:7db8183ce4a4090591cdad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
    <App />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);


