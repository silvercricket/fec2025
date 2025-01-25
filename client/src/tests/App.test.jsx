
import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import App from '../components/App.jsx';
import '@testing-library/jest-dom'
import STORE from '../store/Store.js';
import {Provider} from 'react-redux';
import './matchMedia.mock'; // Must be imported before the tested file

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('App',()=>{
  it('Should render', () => {
    const Apple = render(
      <Provider store={STORE}>
        <App/>
      </Provider>
    );
    console.log(Apple);

    expect(Apple.getByTestId('overview')).toBeDefined();

    expect(Apple.getByTestId('similar')).toBeDefined();

    expect(Apple.getByTestId('qa')).toBeDefined();

    expect(Apple.getByTestId('review')).toBeDefined();
  });
});