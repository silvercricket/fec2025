import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarRatings from '../Reviews/StarRatings.jsx';


const Outfit = ({ currentProduct, currentStyle, handleCardClick }) => {

  const [outfit, setOutfit] = useState([]);
  const [index, setIndex] = useState(0);
  const slidesToShow = 4;

  useEffect(() => {
    setIndex(0);
  }, [currentProduct]);

  const handleAdd = () => {
    const exists = outfit.find((item) => item.id === currentProduct.id);
    if (!exists) {
      setOutfit((prevOutfit => [...prevOutfit, {...currentProduct, ...currentStyle}]));
    }
  };

  const handleRemove = (id) => {
    setOutfit(outfit.filter((item) => item.id !== id));
  };

  const handleNext = () => {setIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {setIndex((prevIndex) => prevIndex - 1);
  };

  const displayPrice = (product) => {
    const { sale_price, original_price } = product.results[0];

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
    <div>
      <h3>Your Outfit</h3>
      <div
        className="outfit-container"
        data-testid="outfit">
          <div
            className="outfit-track"
            style={{
              display: 'flex',
              transform: `translateX(-${index * (100 / slidesToShow)}%)`,
              transition: 'transform 0.3s ease-in-out',
              }}>
                <div className="outfit-card empty-card">
                    <button
                      className="add-button"
                      data-testid="add-button"
                      onClick={handleAdd}>+</button>
                    <h5>Add to Outfit</h5>
                  </div>
                  {outfit.map((product) => (
                    <div key={product.id}
                    className="carousel-card"
                    data-testid="item-added"
                    >
                      <button
                        className="close-button"
                        data-testid="close-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(product.id);
                        }}>X</button>
                      <img
                        src={cleanUrl(product)}
                        className="carousel-card-image"
                        data-testid="oufit-card-image"
                        onClick={() => handleCardClick(product)}/>
                      <div className="card-content">
                        <h6>{product.category}</h6>
                        <h3>{product.name}</h3>
                        <h3
                          className="card-price"
                          data-testid="price">
                            {displayPrice(product)}</h3>
                        <h5 className="card-star-rating"><StarRatings /></h5>
                      </div>
                  </div>
                ))}
          </div>
            {outfit.length > slidesToShow && (
              <div>
                <button
                  className="carousel-button prev"
                  data-testid="prev-button"
                  onClick={handlePrev}
                  disabled={index === 0}>←</button>
                <button
                  className="carousel-button next"
                  onClick={handleNext}
                  disabled={index >= outfit.length - slidesToShow}>→</button>
              </div>
            )}
        </div>
      </div>
  );
};

Outfit.propTypes = {
  currentProduct: PropTypes.object.isRequired,
  currentStyle: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default Outfit;

