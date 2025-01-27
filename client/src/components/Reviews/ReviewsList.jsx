import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import ReviewsListCard from './ReviewsListCard.jsx'

const ReviewsList = () => {
  const Reviews = useSelector(store => store.Reviews);

  const handleSize = () => {
    if(!Array.isArray(Reviews.Reviews)) {
      return '###'
    }
    return Reviews.Reviews.length
  }
  const handleMap = () => {
    var currCards = 2;
    console.log(Reviews.Reviews);
    if(!Array.isArray(Reviews.Reviews)) {
      return '###'
    }
    return (Reviews.Reviews.slice(0, currCards).map(review => { return <ReviewsListCard review={review} />}))
  }

  return (
    <div>
      <h3>{handleSize()} reviews, sorted by SOMETHING</h3>
      {handleMap()}
    </div>
  );
}

export default ReviewsList;