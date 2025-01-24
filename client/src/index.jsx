import React from 'react';
// import './assets/base.css';
// import './assets/styles.css';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import STORE from './store/Store.js';
const root = createRoot(document.getElementById('root'));
root.render(
<Provider store={STORE}>
  <App/>
</Provider>
);