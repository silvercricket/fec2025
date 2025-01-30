import React from 'react';
import StarChart from './AvgVisuals/StarChart.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

const ReviewsSidebar = () => {
  const ReviewsData = useSelector(store => store.ReviewsData);
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

  const handleCharacteristics = () => {
    let productBreakdown = [];
    let characteristics = ReviewsData.Meta.characteristics;
    if (!characteristics) {
      return '###';
    } else {
      for (var char in characteristics) {
        let value = characteristics[char].value;
        productBreakdown.push(
          <div key={char}> {/* Use the characteristic name as the key */}
            <label htmlFor="file">{char}</label>
            <progress id="file" max="5" value={value}>{char}</progress>
          </div>
        );
      }
    }
    return productBreakdown;
  };

  return (
    <div data-testid='sidebar-view' id='metaData'>
      <h3>Ratings & Reviews</h3>
      <h1>{handleRating(handleAvgStars(ReviewsData.Meta.ratings))}</h1>
      <h5>{handlePercentReviews()}% of reviews recommend this product</h5>
      <div style={{  width: "300px", height: "200px" }}>
        <StarChart ratings={ReviewsData.Meta.ratings}/>
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