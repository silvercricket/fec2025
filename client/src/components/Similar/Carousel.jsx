import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import Hover from './Hover.jsx';
import StarRatings from '../Reviews/StarRatings.jsx';


const Carousel = ({ items, currentProduct, handleCardClick, handleStarClick }) => {

  const [index, setIndex] = useState(0);
  const slidesToShow = 5;

  useEffect(() => {
    setIndex(0);
  }, [currentProduct]);

  const stars = {
        fullStar: <FontAwesomeIcon icon={faStar} />,
        emptyStar: <FontAwesomeIcon icon={faRegularStar} />,
        halfStar: <FontAwesomeIcon icon={faStarHalf} />,
      }

  if (!items || items.length < 1) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const displayPrice = (product) => {
    if (!product || !product.results || product.results.length === 0) {
      return <div>Loading...</div>;
    }
    const { sale_price, original_price } = product.results[0] || {};

    return sale_price ?
    (<span>
      <s style={{color:'grey'}}>{original_price}</s>&nbsp;
      <span style={{color: 'red'}}>${sale_price}</span>
    </span>)
    :
    (<span>${original_price}</span>);
  };

  const cleanUrl = (product) => {
    const urlImg = product?.results?.[0]?.photos?.[0]?.thumbnail_url || '';
    return urlImg.startsWith('u') ? urlImg.slice(1) : urlImg || 'https://ih1.redbubble.net/image.3572931436.7035/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg';
  };


  return (
    <div
      className="carousel-wrapper"
      data-testid="carousel">
      <button
          className="carousel-button prev"
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
              {items.length > 0 && items
                .filter((product) => currentProduct && product.id !== currentProduct.id)
                .map((product) => (
                  <div key={product.id}
                  className="carousel-card"
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
                      }}>{stars.fullStar}</button>
                      {product.results ? <img
                        src={cleanUrl(product)}
                        className="carousel-card-image"
                        data-testid="carousel-card-image"
                        onClick={() => handleCardClick(product)}/> : <div>Loading...</div>}
                      <Hover currentStyle={product} />
                      <div className="card-content">
                      <h6>{product.category}</h6>
                      <h3>{product.name}</h3>
                      <h5 className="card-price">{product ? displayPrice(product) : null}</h5>
                      <h5 className="card-star-rating"><StarRatings /></h5>
                      </div>
                  </div>
                ))}
        </div>
      </div>
        <button
          className="carousel-button next"
          onClick={handleNext}
          disabled={index >= items.length - slidesToShow + 1}>→</button>
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


