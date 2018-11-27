import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import reducer from './reducers/index';
import './index.css';
import CinemaApp from './CinemaApp';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

var config = {
  apiKey: "AIzaSyDmxrLYFCGu2LStoMvDcKxCMTbohn2FRaU",
  authDomain: "cinema-react.firebaseapp.com",
  databaseURL: "https://cinema-react.firebaseio.com",
  storageBucket: "cinema-react.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <CinemaApp />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
