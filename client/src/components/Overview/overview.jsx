import React, {useState, useEffect}  from 'react';
/*global process*/
/*eslint no-undef: "error"*/

import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ProductActions} from '../../store/ProductSlice.js';
import {OverviewActions} from '../../store/OverviewSlice.js';
import {PictureActions} from '../../store/PictureSlice.js';
import {GalleryActions} from '../../store/GallerySlice.js';
import {StylesActions} from '../../store/StylesSlice.js';
import MainDisplay from './overviewComponents/MainDisplay.jsx'
import Share from './overviewComponents/Share.jsx'
import Gallery from './overviewComponents/Gallery.jsx';
import Checkout from './overviewComponents/Checkout.jsx';
import Styles from './overviewComponents/Styles.jsx';
import ProductForm from './overviewComponents/ProductForm.jsx';
const Overview = () => {
  const dispatch = useDispatch();
  const Product = useSelector(store => store.Product);
  // const OverviewData = useSelector(store => store.Overview);
  const PictureData = useSelector(store => store.PictureData);
  const GalleryData = useSelector(store => store.GalleryData);
  const [price, setPrice] = useState('');
  // console.log('Product details:')
  // console.log(Product.product);

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
          dispatch(GalleryActions.setGallery(result.data.results[0]));
          dispatch(PictureActions.setPicture(result.data.results[0].photos[0].url));
          dispatch(StylesActions.setStyles(result.data.results));
          setPrice('$' + Product.product.default_price);
          // console.log(result.data.results[0]);
          // console.log(result.data.results[0].photos[0].url);
          //dispatch(ProductActions.setProduct(result.data[0]));

        })
    }
  },[Product]);

  useEffect(() => {
    // console.log('sale?');
    // console.log(GalleryData.Gallery);
    setPrice('$' + Product.product.default_price);
    if(GalleryData.Gallery.sale_price){
      // console.log('you\'ve got sale!');
      setPrice(
      <p style={{color:'red'}}><s>{Product.product.default_price}</s>&nbsp;
      {GalleryData.Gallery.sale_price} </p>
    )
      //setPrice(<s>price</s>  GalleryData.Gallery.sale_price)
    }
  },[GalleryData]);

  return(
  <div data-testid="overview">
    Overview goes here!
    <div id='display'>
      <MainDisplay />
      <Gallery />
    </div>
    <h3>!!!star rating goes here!!!</h3>
    <h3>{Product.product.category}</h3>
    <h2>{Product.product.name}</h2>
    {/* <p>price: {price}</p> */}
    {price}
    <Styles  id='styles' />
    <ProductForm/>
    <div className="clearfix"></div>


    <p>{Product.product.slogan}</p>
    <p>{Product.product.description}</p>


    <Share />
  </div>
);
}

export default Overview;