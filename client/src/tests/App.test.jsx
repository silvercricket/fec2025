/**
 * @jest-environment jsdom
 */
// import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import App from '../components/App.jsx';
import { createRoot } from 'react-dom/client';





//afterEach function runs after each test suite is executed

describe('App',()=>{
  it('Should', () => {
    const Apple = render(
      <App />,
    );
    console.log(Apple);
    Apple.mount();
    const example = Apple.state('product');
    console.log(example);
    expect(true).toBeTruthy();

  });
});