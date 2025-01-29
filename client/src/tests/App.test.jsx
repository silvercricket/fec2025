// /*global describe, it, expect*/
// /*eslint no-undef: "error"*/
// import React from 'react';
// import {render} from '@testing-library/react';
// import App from '../components/App.jsx';
// import '@testing-library/jest-dom'
// import '../../dist/output.css'
// import STORE from '../store/Store.js';
// import {Provider} from 'react-redux';

// describe('App',()=>{

//   it('Should render app and the four main components', () => {
//     const Apple = render(
//       <Provider store={STORE}>
//         <App/>
//       </Provider>
//     );
//     console.log('here');

//     expect(Apple.getByTestId('app')).toBeDefined();

//     expect(Apple.getByTestId('overview')).toBeDefined();

//     expect(Apple.getByTestId('similar')).toBeDefined();

//     expect(Apple.getByTestId('qa')).toBeDefined();

//     expect(Apple.getByTestId('review')).toBeDefined();
//   });

// });