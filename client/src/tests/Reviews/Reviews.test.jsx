// /*global describe, it, expect*/
// /*eslint no-undef: "error"*/
// import React from 'react';
// import {render, fireEvent} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import '../../dist/output.css';
// import STORE from '../../store/Store.js';
// import {Provider} from 'react-redux';
// import Reviews from '../../components/Reviews/Reviews.jsx';

// describe('Review',()=>{

//   it('Should render all non-conditional components of Review', () => {
//     const Review = render(
//       <Provider store={STORE}>
//         <Reviews />
//       </Provider>
//     );

//     expect(Review.getByTestId('review-view')).toBeDefined();

//     expect(Review.getByTestId('metaData-view')).toBeDefined();

//     expect(Review.getByTestId('reviewCards-view')).toBeDefined();

//     expect(Review.getByTestId('sidebar-view')).toBeDefined();

//     expect(Review.getByTestId('list-view')).toBeDefined();
//   });

// });