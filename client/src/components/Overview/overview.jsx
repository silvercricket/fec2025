import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../store/ProductSlice.js';
import {OverviewActions} from '../../store/OverviewSlice.js';
import MainDisplay from './overviewComponents/MainDisplay.jsx'
import Share from './overviewComponents/Share.jsx'
import Gallery from './overviewComponents/Gallery.jsx';
import Checkout from './overviewComponents/Checkout.jsx'


const Overview = () => {
  // const dispatch = useDispatch();
  const Product = useSelector(store => store.Product);
  const OverviewData = useSelector(store => store.OverviewData);
  // dispatch(OverviewActions.setOverview('AHHHHHHHHHHHHH'));
  console.log(Product.product);
  console.log(OverviewData);
  return(
  <div data-testid="overview">
    Overview goes here!
    <MainDisplay />
    <Gallery />
    <Checkout/>
    <Share />
  </div>
);
}

export default Overview;
