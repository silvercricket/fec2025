import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Outfit = ({ currentProduct }) => {

  const [outfit, setOutfit] = useState([]);
  const [index, setIndex] = useState(0);
  const slidesToShow = 4;

  const handleAdd = () => {
    const exists = outfit.find((item) => item.id === currentProduct.id);
    if (!exists) {
      setOutfit([...outfit, currentProduct]);
    }
  };

  const handleRemove = (id) => {
    setOutfit(outfit.filter((item) => item.id !== id));
  };

  const handleNext = () => {setIndex((prevIndex) =>
      Math.min(prevIndex + 1, outfit.length - 1));
  };

  const handlePrev = () => {setIndex((prevIndex) =>
      Math.max(prevIndex - 1, 0));
  };


  return (
    <div>
      <h3>Your Outfit</h3>
      <div className="outfit-container">
        {outfit.length === 0 && (
          <div
          className="outfit-card empty-card"
          onClick={handleAdd}>
          <button className="add-button">+</button>
          <h5>Add to Outfit</h5>
        </div>
        )}
        {outfit.length > 0 && (
          <div className="carousel-container">
          <div
            className="carousel-track"
            style={{
              display: 'flex',
              transform: `translateX(-${index * (100 / slidesToShow)}%)`,
              transition: 'transform 0.3s ease-in-out',
              }}>
                {outfit.map((product) => (
                  <div key={product.id}
                  className="outfit-card"
                  style={{
                    flex: `0 0 ${100 / slidesToShow}%`,
                    boxSizing: 'border-box'
                  }}>
                    <button
                      className="close-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(product.id);
                      }}>X</button>
                      <img src={product}/>
                      <div className="card-content">
                        <h6>{product.category}</h6>
                        <h3>{product.name}</h3>
                        <h5>{product.default_price}</h5>
                        <h5>star rating</h5>
                      </div>
                  </div>
                ))}
          </div>
            {outfit.length > slidesToShow && (
              <div>
                <button
                  className="prev"
                  onClick={handlePrev}
                  disabled={index === 0}>Previous</button>
                <button
                  className="next"
                  onClick={handleNext}
                  disabled={index >= outfit.length - 1}>Next</button>
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
};

Outfit.propTypes = {
  currentProduct: PropTypes.object.isRequired,
};

export default Outfit;


