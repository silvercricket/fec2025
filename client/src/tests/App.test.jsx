/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import App from '../components/App.jsx';
import '@testing-library/jest-dom'
import STORE from '../store/Store.js';
import {Provider} from 'react-redux';



//afterEach function runs after each test suite is executed

describe('App',()=>{
  it('Should render', () => {
    const Apple = render(
      <Provider store={STORE}>
        <App/>
      </Provider>
    );
    console.log(Apple);
    expect(true).toBeTruthy();

  });
});