import React from 'react';
import StarChart from './AvgVisuals/StarChart.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

const ReviewsSidebar = () => {
<<<<<<< HEAD
  const Reviews = useSelector(store => store.ReviewsData);
=======
  const ReviewsData = useSelector(store => store.ReviewsData);
>>>>>>> origin
  const stars = {
      fullStar: <FontAwesomeIcon icon={faStar} />,
      emptyStar: <FontAwesomeIcon icon={faRegularStar} />,
      halfStar: <FontAwesomeIcon icon={faStarHalf} />,
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
  const handlePercentReviews = () => {
    var recommended = ReviewsData.Meta.recommended
    if(!recommended) {
      return '###'
    }
    var trues = Number(recommended.true)
    var falses = Number(recommended.false)
    return (Math.floor((trues / (trues + falses)) * 100));
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
    return ratingEle;
  }

  const handleCharacteristics = () => {
    let productBreakdown = [];
    let characteristics = ReviewsData.Meta.characteristics;
    if (!characteristics) {
      return '###';
    } else {
      for (var char in characteristics) {
        let value = characteristics[char].value
        console.log(value);
        productBreakdown.push( <div>
        <label htmlFor="file">{char}</label>
        <progress id='file' max='5' value={`${value}`}>{`${char}`}</progress>
      </div>)
      }
    }
    return productBreakdown;
  }
  return (
    <div id='metaData'>
      <h3>Ratings & Reviews</h3>
      <h1>{handleRating(handleAvgStars(ReviewsData.Meta.ratings))}</h1>
      <h5>{handlePercentReviews()}% of reviews recommend this product</h5>
      <div style={{  width: "300px", height: "200px" }}>
        <StarChart />
      </div>
      <div>
        <div>
          {handleCharacteristics()}
        </div>
      </div>
    </div>
  )
}



export default ReviewsSidebar;