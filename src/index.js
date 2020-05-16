import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './custom.scss';
import './Assets/fonts/GothamHTF-Bold.otf'
import './Assets/fonts/GothamHTF-Light.otf'
import './Assets/fonts/GothamHTF-Book.otf'
import 'react-widgets/lib/scss/react-widgets.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
