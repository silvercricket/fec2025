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
  // console.log(Product);

  // console.log('Product details:')
  // console.log(Product);
  // console.log(OverviewData);

  useEffect(() => {
    if(Product.id){
      axios.get(process.env.API_URL + `/products/${Product.id}/styles`,{headers: {Authorization:process.env.AUTH_SECRET} })
        .then((result)=>{

          dispatch(GalleryActions.setGallery(result.data.results[0]));
          dispatch(PictureActions.setPicture(result.data.results[0].photos[0].url));
          dispatch(StylesActions.setStyles(result.data.results));
          setPrice('$' + Product.default_price);
          // console.log(result.data.results[0]);
          // console.log(result.data.results[0].photos[0].url);
          //dispatch(ProductActions.setProduct(result.data[0]));

        })
    }
  },[Product]);

  useEffect(() => {

    setPrice('$' + Product.default_price);
    if(GalleryData.Gallery.sale_price){
      setPrice(
      <p style={{color:'red'}}><s>{Product.default_price}</s>&nbsp;
      {GalleryData.Gallery.sale_price} </p>
    )
      //setPrice(<s>price</s>  GalleryData.Gallery.sale_price)
    }
  },[GalleryData]);

  return(
  <div id="overview" data-testid="overview"
      style={{
        background: "linear-gradient(rgb(27, 100, 60), rgb(25, 77, 146))",
        height: 800,
        width: "100%",
        margin: "auto",
        padding: "2%",
        border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: "2px solid black",
        float: "left",
        //objectFit: "contain"
        //overflow: "hidden"

    }}>
    <div id='display' style={{height: "80%", width: "40%", float: "left",}}>
      <MainDisplay  />

    </div>
    <h3>!!!star rating goes here!!!</h3>
    <h3>{Product.category}</h3>
    <h2>{Product.name}</h2>
    {/* <p>price: {price}</p> */}
    {price}
    <Styles  id='styles' />
    <ProductForm/>
    <div className="clearfix"></div>


    <p>{Product.slogan}</p>
    <p>{Product.description}</p>


    <Share />
  </div>
);
}

export default Overview;