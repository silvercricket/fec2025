import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import {useDispatch, useSelector} from 'react-redux';

const StarRatings = () => {
  const ReviewsMeta = useSelector(store => store.ReviewsMeta);
  const stars = {
      fullStar: <FontAwesomeIcon icon={faStar} />,
      emptyStar: <FontAwesomeIcon icon={faRegularStar} />,
      halfStar: <FontAwesomeIcon icon={faStarHalfAlt} />,
    }
  const handleAvgStars = (Reviews) => {
    let avgStars = 0;
    let totalStars = 0;
    if(!Reviews) {
      return '###';
    }
    for(var stars in Reviews) {
      avgStars += stars * Reviews[stars]
      totalStars += Number(Reviews[stars]);
    }
    return Math.round((avgStars/totalStars) * 2) / 2;
  }

  const handleRating = (rating) => {
    let ratingEle = [];
    let numStars = rating;

    for (let i = 0; i < Math.floor(numStars); i++) {
      ratingEle.push(<span key={`fullStar-${i}`}>{stars.fullStar}</span>);
    }
    if (numStars % 1 === 0.5) {
      ratingEle.push(<span key={`halfStar`}>{stars.halfStar}</span>);
    }
    for (let i = ratingEle.length; i < 5; i++) {
      ratingEle.push(<span key={`emptyStar-${i}`}>{stars.emptyStar}</span>);
    }
    return ratingEle;
  };

  return (handleRating(handleAvgStars(ReviewsMeta.ratings)))
}

export default StarRatings;