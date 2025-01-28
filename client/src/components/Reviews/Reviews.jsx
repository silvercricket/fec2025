/*global process*/
/*eslint no-undef: "error"*/
import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ReviewsSidebar from './ReviewsSidebar.jsx'
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import ReviewsList from './ReviewsList.jsx';

const Reviews = () => {
  const Product = useSelector(store => store.Product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Product.product.id) {
      axios.get(process.env.API_URL + `/reviews/`,{params: { product_id: Product.product.id }, headers: {Authorization:process.env.AUTH_SECRET} })
      .then((response)=>{
        dispatch(ReviewsActions.setReviews(response.data.results));
      })
      .catch((err)=> {
        console.log(err);
      })

      axios.get(process.env.API_URL + `/reviews/meta`,{params: { product_id: Product.product.id }, headers: {Authorization:process.env.AUTH_SECRET} })
      .then((response)=>{
        dispatch(ReviewsActions.setMeta(response.data));
      })
      .catch((err)=> {
        console.log(err);
      })
    }

  },[Product.product.id]);

  return (
    <div data-testid="review">
      <div id='metaData'>
        <ReviewsSidebar />
      </div>
      <div id='reviewCards'>
        <ReviewsList />
      </div>
    </div>
  )
}



export default Reviews;