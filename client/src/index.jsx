import React from 'react';
// import './assets/base.css';
// import './assets/styles.css';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
console.log(document.getElementById('root'));
root.render(<App/>);