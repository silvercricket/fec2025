import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Hover = ({ currentStyle }) => {

  const [index, setIndex] = useState(0);

  const slidesToShow = 4;

  if (!currentStyle || !currentStyle.results || !currentStyle.results[0].photos) {
    return null;
  }

  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div
      className="hover-wrapper"
      data-testid="hover">
      <button
          className="hover-button prev"
          onClick={handlePrev}
          disabled={index === 0}>←</button>
      <div className="hover-container">
        <div
          className="hover-track"
          style={{
            display: 'flex',
            transform: `translateX(-${index * (100 / slidesToShow)}%)`,
            transition: 'transform 0.3s ease-in-out'
            }}>
              {currentStyle.results[0].photos.length > 0 && currentStyle.results[0].photos.map((photo, i) => (
                  <div key={i}
                  className="hover-card"
                  onClick={() => console.log('update current product style')}
                  style={{
                    flex: `0 0 ${100 / slidesToShow}%`,
                    boxSizing: 'border-box'
                  }}>
                    <img src={photo.thumbnail_url} className="card-photo-thumbs"/>
                  </div>
                ))}
        </div>
      </div>
        <button
          className="hover-button next"
          onClick={handleNext}
          disabled={index >= currentStyle.results[0].photos.length - slidesToShow}>→</button>
    </div>
  );

};

Hover.propTypes = {
  currentStyle: PropTypes.object.isRequired
};

export default Hover;