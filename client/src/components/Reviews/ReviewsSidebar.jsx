import React from 'react';
import StarChart from './AvgVisuals/StarChart.jsx';
import {useSelector} from 'react-redux';
import StarRatings from './StarRatings.jsx';

const ReviewsSidebar = () => {
  const ReviewsMeta = useSelector(store => store.ReviewsMeta);
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
    const charLabels = {
      Size: {
        low: "A size too small",
        high: "A size too wide"
      },
      Width: {
        low: "Too narrow",
        high: "Too wide"
      },
      Comfort: {
        low: "Uncomfortable",
        high: "Perfect"
      },
      Quality: {
        low: "Poor",
        high: "Perfect"
      },
      Length: {
        low: "Runs Short",
        high: "Runs long"
      },
      Fit: {
        low: "Runs tight",
        high: "Runs long"
      }
    }

    let productBreakdown = [];
    let characteristics = ReviewsMeta.characteristics;
    if (!characteristics) {
      return '###';
    } else {
      for (var char in characteristics) {
        const labels = charLabels[char] || { low: "", high: "" };
        let value = characteristics[char].value;
        const progressPercentage = ((value - 1) / 4) * 100;
        productBreakdown.push(
          <div key={char} className="spectrum-container">
          <label htmlFor="file">{char}</label>
          <div className="spectrum-bar">
            <div className="spectrum-fill" style={{ width: `${progressPercentage}%` }}></div>
            <div className="indicator" style={{ left: `${progressPercentage}%` }}></div>
          </div>
          <div className="metaLabels">
            {labels.low && <span className="metaLow-label">{labels.low}</span>}
            {labels.high && <span className="metaHigh-label">{labels.high}</span>}
          </div>
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