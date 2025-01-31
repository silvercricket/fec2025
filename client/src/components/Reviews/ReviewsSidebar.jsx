import React from 'react';
import StarChart from './AvgVisuals/StarChart.jsx';
import {useSelector} from 'react-redux';
import StarRatings from './StarRatings.jsx';

const ReviewsSidebar = () => {
  const ReviewsMeta = useSelector(store => store.ReviewsMeta);
  // console.log(ReviewsMeta);
  const handlePercentReviews = () => {
    var recommended = ReviewsMeta.recommended
    if(!recommended) {
      return '###'
    }
    var trues = Number(recommended.true)
    var falses = Number(recommended.false)
    return (Math.floor((trues / (trues + falses)) * 100));
  }

  const handleCharacteristics = () => {
    let productBreakdown = [];
    let characteristics = ReviewsMeta.characteristics;
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
      <h1><StarRatings /></h1>
      <h5>{handlePercentReviews()}% of reviews recommend this product</h5>
      <div style={{  width: "300px", height: "200px" }}>
        <StarChart ratings={ReviewsMeta.ratings}/>
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