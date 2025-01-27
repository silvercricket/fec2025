import React, { useState } from 'react';
// import 'path to Similar css file or project css'

const Carousel = ({ items }) => {

  const [index, setIndex] = useState(0);

  const slidesToShow = 3;

  // const slidesToShow2 = 1;

  const handleNext = () => {
    setIndex((prevIndex) =>
      Math.min(prevIndex + 1, items.length - slidesToShow));
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {items.map((item, i) => (
          <div key={i}
          className="carousel-card">
            {item}
          </div>
        ))}
      </div>
        <button
          className="prev"
          onClick={handlePrev}
          disabled={index === 0}>Previous</button>
        <button
          className="next"
          onClick={handleNext}
          disabled={index === items.length - slidesToShow}>Next</button>
    </div>
  )
};

export default Carousel;