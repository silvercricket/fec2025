import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ProductActions} from '../../store/ProductSlice.js';
import {OverviewActions} from '../../store/OverviewSlice.js';
import {PictureActions} from '../../store/PictureSlice.js';
import {GalleryActions} from '../../store/GallerySlice.js';
import MainDisplay from './overviewComponents/MainDisplay.jsx'
import Share from './overviewComponents/Share.jsx'
import Gallery from './overviewComponents/Gallery.jsx';
import Checkout from './overviewComponents/Checkout.jsx'

const Overview = () => {
  const dispatch = useDispatch();
  const Product = useSelector(store => store.Product);
  // const OverviewData = useSelector(store => store.Overview);
  const PictureData = useSelector(store => store.PictureData);

  // console.log('Product details:')
  // console.log(Product.product);
  // console.log(OverviewData);

  useEffect(() => {
    if(Product.product.id){
      // console.log(Product.product);
      axios.get(process.env.API_URL + `/products/${Product.product.id}/styles`,{headers: {Authorization:process.env.AUTH_SECRET} })
        .then((result)=>{
          // console.log('______PRODUCT STYLES BELOW:________')
          // console.log(result.data.results[0]);
          // dispatch(OverviewActions.setOverview(result.data.results[0]));
          dispatch(GalleryActions.setGallery(result.data.results[0].photos));
          dispatch(PictureActions.setPicture(result.data.results[0].photos[0].url));
          // console.log(result.data.results[0].photos[0].url);
          //dispatch(ProductActions.setProduct(result.data[0]));

        })
    }
  },[Product]);
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