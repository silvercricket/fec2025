import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import ReviewsListCard from './ReviewsListCard.jsx'

const ReviewsList = () => {
<<<<<<< HEAD
  const Reviews = useSelector(store => store.ReviewsData);
=======
  const ReviewsData = useSelector(store => store.ReviewsData);
>>>>>>> origin

  const handleSize = () => {
    if(!Array.isArray(ReviewsData.Reviews)) {
      return '###'
    }
    return ReviewsData.Reviews.length
  }
  const handleMap = () => {
    var currCards = 2;
    console.log(ReviewsData.Reviews);
    if(!Array.isArray(ReviewsData.Reviews)) {
      return '###'
    }
    return (ReviewsData.Reviews.slice(0, currCards).map(review => { return <ReviewsListCard review={review} />}))
  }

  return (
    <div>
      <h3>{handleSize()} reviews, sorted by SOMETHING</h3>
      {handleMap()}
    </div>
  );
}

export default ReviewsList;