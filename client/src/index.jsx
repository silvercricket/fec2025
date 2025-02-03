import React from 'react';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import STORE from './store/Store.js';
import '../dist/styles/index.css';
import logo from './east_blue_logo.jpg';

const root = createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Provider store={STORE}>
  <App logo={logo} />
</Provider>
</React.StrictMode>

);