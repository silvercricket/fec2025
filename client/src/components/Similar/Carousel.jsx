import React, { useState } from 'react';
import '../../input.css';
import PropTypes from 'prop-types';


const Carousel = ({ items, handleCardClick, handleStarClick, currentProduct }) => {

  const [index, setIndex] = useState(0);

  const slidesToShow = 4;

  const handleNext = () => {
    setIndex((prevIndex) =>
      Math.min(prevIndex + 1, items.length - 1));
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      Math.max(prevIndex - 1, 0));
  };


  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{
          display: 'flex',
          transform: `translateX(-${index * (100 / slidesToShow)}%)`,
          transition: 'transform 0.3s ease-in-out',
          width: `${(items.length * 100) / slidesToShow}%`
          }}>
        {items.map((product) => (
          <div key={product.id}
          className="carousel-card"
          style={{
            flex: `0 0 ${100 / slidesToShow}%`,
            boxSizing: 'border-box'
          }}
          onClick={() => handleCardClick(product)}>
            <button
              className="star-button"
              onClick={(e) => {
                e.stopPropagation();
                handleStarClick(currentProduct, product);
              }}>⭐</button>
              <img src={product.results[0].photos[0].thumbnail_url} alt={product.name}/>
              <div className="card-content">
              <h6>{product.category}</h6>
              <h3>{product.name}</h3>
              <h5>{product.default_price}</h5>
              <h5>star rating</h5>
              </div>
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
          disabled={index >= items.length - 1}>Next</button>
    </div>
  )
};

Carousel.propTypes = {
  items: PropTypes.object.isRequired,
  currentProduct: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleStarClick: PropTypes.func.isRequired
};

export default Carousel;


