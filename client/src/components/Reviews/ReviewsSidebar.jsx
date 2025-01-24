import React from 'react';
import StarChart from './AvgVisuals/StarChart.jsx';

const ReviewsSidebar = () => {
  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <h1>Average stars</h1>
      <h5>% of reviews recommend this product</h5>
      <div style={{  width: "300px", height: "200px" }}>
        {<StarChart />}
      </div>
      <div>
        <h4>Relevant comparison 1</h4>
        <h4>Relevant comparison 1</h4>
      </div>
    </div>
  )
}



export default ReviewsSidebar;