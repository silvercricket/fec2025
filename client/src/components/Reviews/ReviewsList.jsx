import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import ReviewsListCard from './ReviewsListCard.jsx'

const ReviewsList = () => {
  const ReviewsData = useSelector(store => store.ReviewsData);
  const [numOfReviewCards, setNumOfReviewCards] = React.useState(0);
  const handleSize = () => {
    if(!Array.isArray(ReviewsData.Reviews)) {
      return '###'
    }
    return ReviewsData.Reviews.length
  }
  const handleMap = (extra) => {
    var currCards = 2 + extra;
    console.log(ReviewsData.Reviews);
    if(!Array.isArray(ReviewsData.Reviews)) {
      return '###'
    }
    return (ReviewsData.Reviews.slice(0, currCards).map(review => { return <ReviewsListCard review={review} />}))
  }

  return (
    <div>
      <h3>{handleSize()} reviews, sorted by SOMETHING</h3>
      {handleMap(numOfReviewCards)}
      <div>
        <button onClick={() => setNumOfReviewCards(numOfReviewCards + 2)}>MORE REVIEWS</button>
        <button>+ ADD REVIEW</button>
      </div>
    </div>
  );
}

export default ReviewsList;