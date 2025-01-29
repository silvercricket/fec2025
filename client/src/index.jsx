import React from 'react';
// import './assets/base.css';
// import './assets/styles.css';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import STORE from './store/Store.js';
import './../dist/output.css';

const root = createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Provider store={STORE}>
  <App/>
</Provider>
</React.StrictMode>

);