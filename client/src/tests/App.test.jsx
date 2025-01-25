/**
 * @jest-environment jsdom
 */
// import React from 'react';
import "@testing-library/jest-dom";
import {screen, cleanup, fireEvent, render} from '@testing-library/react';
import App from '../components/App.jsx';
import { createRoot } from 'react-dom/client';
import {Provider, useDispatch, useSelector} from 'react-redux';
// import '../../../jest.polyfills.js';
// import { TextDecoder, TextEncoder } from 'util';
import STORE from '../store/Store.js';
// import { http, HttpResponse, delay } from 'msw';
// import { setupServer } from 'msw/node';


// export const handlers = [
//   http.get('/api/user', async () => {
//     await delay(150)
//     return HttpResponse.json('John Smith')
//   })
// ]

// const server = setupServer(...handlers)

// // Enable API mocking before tests.
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are done.
// afterAll(() => server.close())


//afterEach function runs after each test suite is executed
describe('App',()=>{
  console.log(render(<App />));
  it('Should', async () => {
    // const Product = useSelector(store => store.Product);
    // const Apple = render(
    //   <Provider store={STORE}>
    //     <App/>
    //   </Provider>
    //   );
    // const Wrapper = ({children}) => (
    //   <Provider store={STORE}>
    //     {children}
    //   </Provider>
    //   );
    expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
    // console.log(Product);
    // console.log(Apple);
    //Apple.mount();
    //const example = Apple.state('product');
    // const Product = selector(store => store.Product);

    //console.log(Product);
    expect(true).toBeTruthy();

  });
});