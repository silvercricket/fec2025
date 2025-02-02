/*global process*/
/*eslint no-undef: "error"*/
import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ReviewsSidebar from './ReviewsSidebar.jsx'
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import ReviewsList from './ReviewsList.jsx';
import {ReviewsMetaActions} from '../../store/ReviewsMetaSlice.js';

const Reviews = () => {
  const Product = useSelector(store => store.Product);
  const [currPage, setCurrPage] = React.useState(1);
  const [sort, setSort] = React.useState("relevant");
  const dispatch = useDispatch();

  useEffect(() => {
    if (Product.id) {
      axios.get(process.env.API_URL + `/reviews/`,{params: {
        product_id: Product.id,
        page: currPage,
        sort: sort,
      },
      headers: {
        Authorization:process.env.AUTH_SECRET
      } })
      .then((response)=>{
        dispatch(ReviewsActions.setReviews(response.data.results));
      })
      .catch((err)=> {
        console.log(err);
      })

      axios.get(process.env.API_URL + `/reviews/meta`,{params: {
        product_id: Product.id,
      }, headers: {Authorization:process.env.AUTH_SECRET} })
      .then((response)=>{
        dispatch(ReviewsMetaActions.setReviewsMeta(response.data));
      })
      .catch((err)=> {
        console.log(err);
      })
    }

  },[Product.id, currPage, sort]);

  return (
    <div data-testid="review-view">
      <div data-testid='metaData-view'>
        <ReviewsSidebar />
      </div>
      <div data-testid='reviewCards-view'>
        <ReviewsList key={Product.id} setCurrPage={setCurrPage} currPage={currPage} setSort={setSort} sort={sort}/>
      </div>
    </div>
  )
}



export default Reviews;