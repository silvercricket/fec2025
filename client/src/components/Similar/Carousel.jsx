import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hover from './Hover.jsx';

const Carousel = ({ items, handleCardClick, handleStarClick, currentStyle }) => {

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

  const displayPrice = (product) => {
    const { sale_price, original_price } = product.results[2];

    return sale_price ?
    (<span>
      <s style={{color:'grey'}}>{original_price}</s>&nbsp;
      <span style={{color: 'red'}}>${sale_price}</span>
    </span>)
    :
    (<span>${original_price}</span>);
  };


  return (
    <div
      className="carousel-wrapper"
      data-testid="carousel">
      <button
          className="carousel-button"
          onClick={handlePrev}
          disabled={index === 0}>←</button>
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            display: 'flex',
            transform: `translateX(-${index * (100 / slidesToShow)}%)`,
            transition: 'transform 0.3s ease-in-out'
            }}>
              {items.length > 0 && items.map((product) => (
                  <div key={product.id}
                  className="carousel-card"
                  // onClick={() => handleCardClick(product)}
                  style={{
                    flex: `0 0 ${100 / slidesToShow}%`,
                    boxSizing: 'border-box'
                  }}>
                    <button
                      data-testid="star-button"
                      className="star-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarClick(product);
                      }}>⭐</button>
                      <img
                        src={product.results[0].photos[0].thumbnail_url}
                        className="carousel-card-image"/>
                      <Hover currentStyle={product} />
                      <div className="card-content">
                      <h6>{product.category}</h6>
                      <h3>{product.name}</h3>
                      <h5 className="card-price">{displayPrice(product)}</h5>
                      <h5 className="card-star-rating">star rating</h5>
                      </div>
                  </div>
                ))}
        </div>
      </div>
        <button
          className="carousel-button"
          onClick={handleNext}
          disabled={index >= items.length - 1}>→</button>
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


