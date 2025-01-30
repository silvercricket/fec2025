import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overview from '../../components/Overview/overview.jsx';
import MainDisplay from '../../components/Overview/overviewComponents/MainDisplay.jsx';
import Gallery from '../../components/Overview/overviewComponents/Gallery.jsx';
import GalleryElement from '../../components/Overview/overviewComponents/GalleryElement.jsx';
import Styles from '../../components/Overview/overviewComponents/Styles.jsx';
import ProductForm from '../../components/Overview/overviewComponents/ProductForm.jsx';
import Share from '../../components/Overview/overviewComponents/Share.jsx';
import '@testing-library/jest-dom';
import '../../dist/output.css';
import STORE from '../../store/Store.js';
import {Provider} from 'react-redux';


describe('Overview',()=>{

  it('Should render non-conditional subcomponents of Overview', () => {
    const OverviewTest = render(
      <Provider store={STORE}>
        <Overview/>
      </Provider>
    );

    expect(OverviewTest.getByTestId('share')).toBeDefined();
    expect(OverviewTest.getByTestId('mainDisplay')).toBeDefined();

  });
  it('Should render images in galleryElement when images are provided', () => {
    const GalleryElementTest = render(
      <Provider store={STORE}>
        <GalleryElement image= {'https://pbs.twimg.com/media/GSsUqwGXsAA-cD_.jpg:large'} index = {0}/>
      </Provider>
    );

    expect(GalleryElementTest.getByTestId('galleryPicture')).toBeDefined();


  });

  it('Should render placeholder if the image provided is an invalid type', () => {
    const GalleryElementTest = render(
      <Provider store={STORE}>
        <GalleryElement image= {7} index = {0}/>
      </Provider>
    );

    expect(GalleryElementTest.getByTestId('galleryPicturePlaceholder')).toBeDefined()


  });


});