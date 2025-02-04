// import React from 'react';
// import { Provider } from 'react-redux';
// import { render, fireEvent, waitFor, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import '../../dist/output.css';
// import STORE from '../../store/Store.js';
// import {configureStore} from '@reduxjs/toolkit';
// import Similar from '../../components/Similar/similar.jsx';
// import Carousel from '../../components/Similar/Carousel.jsx';
// import Compare from '../../components/Similar/Compare.jsx';
// import Outfit from '../../components/Similar/Outfit.jsx';
// import Hover from '../../components/Similar/Hover.jsx'
// import ProductSlice from '../../store/ProductSlice.js';
// import axios from 'axios';

// jest.mock('axios');
// jest.mock('../../components/Reviews/StarRatings', () => {
//   return function StarRatings() {
//     return <div>star ratings</div>;
//   }
// });

// beforeEach(() => {
//   jest.clearAllMocks();
// });

// describe('Similar', () => {

//   it('Should render all non-conditional components of Similar component', () => {
//     const Related = render(
//       <Provider store={STORE}>
//         <Similar />
//       </Provider>
//     );

//     expect(Related.getByTestId('similar')).toBeDefined();

//   });

//   it('should render a product card in related items carousel', () => {

//     const testItem = {
//       "id": 11,
//       "name": "Air Minis 250",
//       "category": "Basketball Shoes",
//       "default_price": "0",
//       "features":
//         [{"feature": "Sole", "value": "Rubber"},
//         {"feature": "Material","value": "FullControlSkin"}],
//       "product_id": "11",
//       "results": [{
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "photos": [{
//             "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",}]
//         }]};

//     const CarouselCard = render(
//       <Provider store={STORE}>
//         <Carousel items={[testItem]} currentProduct={{"id": 12}} />
//       </Provider>
//     );

//     expect(CarouselCard.getByTestId('star-button')).toBeDefined();

//   });

//   it('should render an empty placeholder for add-to-outfit', () => {

//     const OutfitCard = render(
//       <Provider store={STORE}>
//         <Outfit />
//       </Provider>
//     );

//     expect(OutfitCard.getByTestId('outfit')).toBeDefined();

//   });

//   it('should add a new item when add-to-outfit button clicked', () => {

//     const testItem = {
//       "id": 11,
//       "name": "Air Minis 250",
//       "category": "Basketball Shoes",
//       "default_price": "0",
//       "features":
//         [{"feature": "Sole", "value": "Rubber"},
//         {"feature": "Material","value": "FullControlSkin"}],
//       "product_id": "11",
//       "results": [{
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "photos": [{
//             "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",}]
//         }]};

//     const testStyle = {
//       "product_id": "11",
//       "results": [{
//           "style_id": 1,
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "default?": true,
//           "photos": [{
//               "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//               "url": "urlplaceholder/style_1_photo_number.jpg"}]
//       }]};

//     const handleClick = jest.fn();

//     const AddedItem = render(
//       <Provider store={STORE}>
//         <Outfit currentProduct={testItem} currentStyle={testStyle} onClick={handleClick}/>
//       </Provider>
//     )

//     fireEvent.click(AddedItem.getByTestId('add-button'))

//     expect(AddedItem.getByTestId('item-added')).toBeDefined();

//   });

//   it('should open a modal when star-button is clicked', () => {

//     const testItem = {
//       "id": 11,
//       "name": "Air Minis 250",
//       "category": "Basketball Shoes",
//       "default_price": "0",
//       "features":
//         [{"feature": "Sole", "value": "Rubber"},
//         {"feature": "Material","value": "FullControlSkin"}],
//       "product_id": "11",
//       "results": [{
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "photos": [{
//             "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",}]
//         }]};

//     const handleClick = jest.fn();

//     const CompareItems = render(
//       <Provider store={STORE}>
//         <Carousel
//           items={[testItem]}
//           currentProduct={{"id": 12}}
//           handleStarClick={handleClick}/>
//         <Compare currentProduct={testItem} starClicked={testItem} />
//       </Provider>
//     );

//     fireEvent.click(CompareItems.getByTestId('star-button'))

//     expect(CompareItems.getByTestId('compare')).toBeDefined();

//   });

//   it('should display thumbnails on carousel image hover', () => {

//     const testItem = {
//       "id": 11,
//       "name": "Air Minis 250",
//       "category": "Basketball Shoes",
//       "default_price": "0",
//       "features":
//         [{"feature": "Sole", "value": "Rubber"},
//         {"feature": "Material","value": "FullControlSkin"}],
//       "product_id": "11",
//       "results": [{
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "photos": [{
//             "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",}]
//         }]};

//     const CompareItems = render(
//       <Provider store={STORE}>
//         <Carousel items={[testItem]} currentProduct={{"id": 12}} />
//         <Hover currentStyle={testItem} />
//       </Provider>
//     );

//     fireEvent.mouseOver(CompareItems.getByTestId('carousel-card-image'));

//     expect(CompareItems.getAllByTestId('hover').length).toBeGreaterThan(0);

//   });

//   it('should make an API call to fetch related products', async() => {

//     const mockRelatedIds = [40345, 40346];

//     const mockStore = configureStore({
//       reducer: {
//         Product: ProductSlice.reducer
//       },
//       preloadedState: {
//         Product: { id: 40344 }
//       }
//     });

//     axios.get.mockResolvedValue({ data: mockRelatedIds });

//     let GetStyles;
//     await act(async () => {
//       GetStyles = render(
//     <Provider store={mockStore}>
//       <Similar />
//     </Provider>
//     )});

//     await waitFor(() => expect(axios.get).toHaveBeenCalled());

//     await waitFor(() => expect(axios.get).toHaveBeenCalledWith(`${process.env.API_URL}/products/40344/related`, {headers: {Authorization: process.env.AUTH_SECRET}}));

//     await waitFor(() => expect(GetStyles.getByTestId('similar')).toBeDefined());

//   });

//   it('should update the product display page when a related item is clicked', () => {

//     const testItem = {
//       "id": 11,
//       "name": "Air Minis 250",
//       "category": "Basketball Shoes",
//       "default_price": "0",
//       "features":
//         [{"feature": "Sole", "value": "Rubber"},
//         {"feature": "Material","value": "FullControlSkin"}],
//       "product_id": "11",
//       "results": [{
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "photos": [{
//             "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",}]
//         }]};

//     const mockStore2 = configureStore({
//       reducer: {
//         Product: ProductSlice.reducer
//       },
//       preloadedState: {
//         Product: { id: 12 }
//       }
//     });

//     const UpdatePDP = render(
//       <Provider store={mockStore2}>
//         <Similar />
//         <Carousel
//           items={[testItem]}
//           currentProduct={{"id": 12}}
//           handleCardClick={(product) => {
//             act(() => {
//               mockStore2.dispatch(ProductSlice.actions.setProduct(product));
//             })
//           }}
//            />
//       </Provider>
//     );

//     act(() => {
//       fireEvent.click(UpdatePDP.getByTestId('carousel-card-image'))
//     });

//     waitFor(() => {
//       expect(mockStore2.getState().Product.id).toBe(testItem.id);
//       expect(UpdatePDP.getByText("Air Minis 250")).toBeDefined();
//     });

//   });


// });

// // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1
// // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344
// // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/related
// // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles
// // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&page=2
// // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&sort=newest





