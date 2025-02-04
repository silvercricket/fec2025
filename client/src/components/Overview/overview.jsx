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
import StarDisplay from './overviewComponents/StarDisplay.jsx';


// import star from '../../../img/stars/Star.png'
// import halfStar from '../../../img/stars/halfStar.png'
// import threeQuarterStar from '../../../img/stars/threeQuarterStar.png'
// import quarterStar from '../../../img/stars/quarterStar.png'

const Overview = () => {
  const dispatch = useDispatch();
  const Product = useSelector(store => store.Product);

  const ReviewsData = useSelector(store => store.ReviewsData);

  const PictureData = useSelector(store => store.PictureData);
  const GalleryData = useSelector(store => store.GalleryData);
  const [price, setPrice] = useState('');
  const [score, setScore] = useState(0);




  useEffect(() => {
    if(ReviewsData){

      var scoreTemp = 0;
      for(var i = 0; i < ReviewsData.length;i++) {
        scoreTemp+=ReviewsData[i].rating;
      }
      scoreTemp/=ReviewsData.length;
      setScore(scoreTemp);

    }
  }
  ,[ReviewsData]);
  useEffect(() => {

    if(Product.id){
      axios.get(process.env.API_URL + `/products/${Product.id}/styles`,{headers: {Authorization:process.env.AUTH_SECRET} })
        .then((result)=>{

          dispatch(GalleryActions.setGallery(result.data.results[0]));
          dispatch(PictureActions.setPicture(result.data.results[0].photos[0].url));
          dispatch(StylesActions.setStyles(result.data.results));
          setPrice('$' + Product.default_price);


        })
    }
  },[Product]);

  useEffect(() => {

    setPrice('$' + Product.default_price);
    if(GalleryData.sale_price){
      setPrice(
      <p style={{color:'red'}}><s>{Product.default_price}</s>&nbsp;
      {GalleryData.sale_price} </p>
    )

    }
  },[GalleryData]);

  return(
  <div id="overview" data-testid="overview"
      style={{
        // background: "linear-gradient(rgb(27, 100, 60), rgb(25, 77, 146))",
        height: 800,
        width: "100%",
        margin: "auto",
        padding: "2%",
        // border: "2px solid #000",
        borderRadius: "10px",
        // boxShadow: "2px solid black",
        float: "left",



    }}>
    <div id='display' style={{height: "80%", width: "40%", float: "left",}}>
      <MainDisplay  />

    </div>
    <StarDisplay score={score} />
    <button  onClick={()=>{document.getElementsByClassName("review-container")[0].scrollIntoView();}}>Reviews </button>&nbsp;
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