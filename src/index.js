import React from 'react';
import ReactDOM from 'react-dom';

import createStore from './store';
import { Provider } from 'react-redux';
import App from './components/App';
import './index.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);