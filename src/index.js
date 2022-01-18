import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './Assets/fonts/GothamHTF-Bold.otf'
import './Assets/fonts/GothamHTF-Light.otf'
import './Assets/fonts/GothamHTF-Book.otf'

// import 'react-widgets/lib/scss/react-widgets.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./custom.scss";

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
