import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import ReviewsListCardPhotos from './ReviewsListCardPhotos.jsx';

const ReviewsListCard = ({ review }) => {
  console.log(review);
  const stars = {
    fullStar: <FontAwesomeIcon icon={faStar} />,
    emptyStar: <FontAwesomeIcon icon={faRegularStar} />,
    halfStar: <FontAwesomeIcon icon={faStarHalf} />,
  }
  const handleRating = (rating) => {
    let ratingEle = [];
    let numStars = rating;
    if (rating % 1 === 0.5) {
      while (numStars > 0 ) {
        ratingEle.push(stars.fullStar);
        numStars--
      }
      ratingEle.push(stars.halfStar);
      while (ratingEle.length < 5) {
        ratingEle.push(stars.emptyStar);
      }
    } else {
      while (numStars > 0 ) {
        ratingEle.push(stars.fullStar);
        numStars--
      }
      while (ratingEle.length < 5) {
        ratingEle.push(stars.emptyStar);
      }
    }
    console.log(ratingEle);
    return ratingEle;
  }
  const handleTime = () => {
    const dateString = review.date;
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }
  const handleMap = () => {
    var currPhotos = 2;
    console.log(review.photos);
    if(!Array.isArray(review.photos)) {
      return '###'
    }
    return (review.photos.slice(0, currPhotos).map(photo => { return <ReviewsListCardPhotos photo={photo} />}))
  }

  return (
    <div>
      <h3>Stars: {handleRating(review.rating)}</h3>
      <small>{review.reviewer_name}, {handleTime()}</small>
      <h3>{review.summary}</h3>
      <p>{review.response}</p>
      <div>
        {handleMap()}
      </div>
      <small className='spacious'>
        Helpful?
        <button className='helpButton'>Yes</button>
        ({review.helpfulness})<span className='separator'> | </span>
        <button className='helpButton'>Report</button>
        </small>
        <br></br>
        <small>____________________________________________________________________________________________________</small>
    </div>
  );
}

export default ReviewsListCard;