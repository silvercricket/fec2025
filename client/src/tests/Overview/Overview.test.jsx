import React from 'react';
import {render, waitFor, act, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overview from '../../components/Overview/overview.jsx';
import MainDisplay from '../../components/Overview/overviewComponents/MainDisplay.jsx';
import Gallery from '../../components/Overview/overviewComponents/Gallery.jsx';
import GalleryElement from '../../components/Overview/overviewComponents/GalleryElement.jsx';
import Styles from '../../components/Overview/overviewComponents/Styles.jsx';
import ProductForm from '../../components/Overview/overviewComponents/ProductForm.jsx';
import Share from '../../components/Overview/overviewComponents/Share.jsx';
import App from '../../components/App.jsx';
import '@testing-library/jest-dom';
import '../../dist/output.css';
import STORE from '../../store/Store.js';
import {Provider, useDispatch} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';

import ProductSlice from '../../store/ProductSlice.js';
import GallerySlice from '../../store/GallerySlice.js';
import StylesSlice from '../../store/StylesSlice.js';
import PictureSlice from '../../store/PictureSlice.js';
import OverviewSlice from '../../store/OverviewSlice.js';
import GallerySelectionSlice from '../../store/GallerySelectionSlice.js';


import {ProductActions} from '../../store/ProductSlice.js';
import {OverviewActions} from '../../store/OverviewSlice.js';

import {PictureActions} from '../../store/PictureSlice.js';
import {GalleryActions} from '../../store/GallerySlice.js';
import {StylesActions} from '../../store/StylesSlice.js';

import DummyData from './TestData/dummyData.js';
import selectEvent from 'react-select-event'



jest.mock('axios');

// describe('Overview',()=>{


  beforeEach(() => {
    const mockResponse = { data: {message : 'Grabbed'}};
    axios.get.mockResolvedValue(mockResponse);
  })

  it('Should render non-conditional subcomponents of Overview', () => {
    const OverviewTest = render(
      <Provider store={STORE}>
        <Overview/>
      </Provider>
    );





  it('Should change display based on style selected ', async () => {//to realistically run the majority of these tests, a mock API request seems to be the only way...



    const dummyStyles = DummyData.dummyStyles.results;
    const dummyGallery = DummyData.dummyStyles.results[0];
    const dummyProduct = DummyData.dummyProduct;
    const dummyPicture = DummyData.dummyStyles.results[0].photos[0].url;


    const mockStore = configureStore({
      reducer: {
        Product: ProductSlice.reducer,
        OverviewData: OverviewSlice.reducer,
        GalleryData: GallerySlice.reducer,
        PictureData: PictureSlice.reducer,
        StylesData: StylesSlice.reducer,
        GallerySelection: GallerySelectionSlice.reducer,
      }
    })

    mockStore.dispatch(PictureActions.setPicture(dummyPicture));
    mockStore.dispatch(ProductActions.setProduct(dummyProduct));
    mockStore.dispatch(GalleryActions.setGallery(dummyGallery));
    mockStore.dispatch(StylesActions.setStyles(dummyStyles));


    const Apple = render(
      <Provider store={mockStore}>
        <MainDisplay/>
        <Styles/>
      </Provider>
    );
    Apple.getByTestId("mainDisplay");

    const firstStyle = mockStore.getState().GalleryData.Gallery.style_id;
    act(()=>{
      Apple.getByTestId('stylePicture2').click();
    })

    const secondStyle = mockStore.getState().GalleryData.Gallery.style_id;
    expect(firstStyle).not.toBe(secondStyle);


  });

  // it('Should list quantity as OUT OF STOCK when no products of that size remain', async () => {//to realistically run the majority of these tests, a mock API request seems to be the only way...




  //   const dummyGallery = DummyData.dummyStyles.results[0];


  //   const mockStore = configureStore({
  //     reducer: {
  //       GalleryData: GallerySlice.reducer,
  //     }
  //   })

  //   mockStore.dispatch(GalleryActions.setGallery(dummyGallery));


  //   const Apple = render(
  //     <Provider store={mockStore}>
  //       <ProductForm/>
  //     </Provider>
  //   );

  //   act(()=>{
  //     fireEvent.change(Apple.getByTestId('selectSize'), { target: { value: 'Hello world' } });
  //     //Apple.getByTestId('selectSize').change({ target: { value: 'M' } });
  //   })

  //   // await selectEvent.select(Apple.getByTestId('selectSize'), ['M'])
  //   expect(Apple.getByTestId('selectQuantity')).toHaveValue('OUT OF STOCK');
  //   console.log(Apple.getByTestId('selectQuantity'));
  //   //expect(firstStyle).not.toBe(secondStyle);


  // });




});
