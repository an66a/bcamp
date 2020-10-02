import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>

    <App />
  
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

