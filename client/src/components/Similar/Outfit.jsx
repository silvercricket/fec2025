import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Outfit = ({ currentProduct, currentStyle }) => {

  const [outfit, setOutfit] = useState([]);
  const [index, setIndex] = useState(0);
  const slidesToShow = 5;

  const handleAdd = () => {
    const exists = outfit.find((item) => item.id === currentProduct.id);
    if (!exists) {
      setOutfit((prevOutfit => [...prevOutfit, currentProduct]));
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


  return (
    <div>
      <h3>Your Outfit</h3>
      <div
        className="outfit-container"
        data-testid="outfit">
          <div
            className="carousel-track"
            style={{
              display: 'flex',
              transform: `translateX(-${index * (100 / slidesToShow)}%)`,
              transition: 'transform 0.3s ease-in-out',
              }}>
                <div className="outfit-card empty-card">
                    <button
                      className="add-button"
                      onClick={handleAdd}>+</button>
                    <h5>Add to Outfit</h5>
                  </div>
                  {outfit.map((product) => (
                    <div key={product.id}
                    className="carousel-card"
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
                      <img
                        src={currentStyle.results[0].photos[0].thumbnail_url}
                        className="carousel-card-image"/>
                      <div className="card-content">
                        <h6>{product.category}</h6>
                        <h3>{product.name}</h3>
                        <h5 className="card-price">{displayPrice(currentStyle)}</h5>
                        <h5 className="card-star-rating">star rating</h5>
                      </div>
                  </div>
                ))}
          </div>
            {outfit.length > slidesToShow && (
              <div>
                <button
                  className="prev"
                  onClick={handlePrev}
                  disabled={index === 0}>←</button>
                <button
                  className="next"
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
  currentStyle: PropTypes.object.isRequired
};

export default Outfit;

// return (
//   <div>
//     <h3>Your Outfit</h3>
//     <div
//       className="outfit-container"
//       data-testid="outfit">
//       {outfit.length === 0 && (
//         <div
//         className="outfit-card empty-card"
//         onClick={handleAdd}>
//         <button className="add-button">+</button>
//         <h5>Add to Outfit</h5>
//       </div>
//       )}
//       {outfit.length > 0 && (
//         <div className="carousel-container">
//         <div
//           className="carousel-track"
//           style={{
//             display: 'flex',
//             transform: `translateX(-${index * (100 / slidesToShow)}%)`,
//             transition: 'transform 0.3s ease-in-out',
//             }}>
//               {outfit.map((product) => (
//                 <div key={product.id}
//                 className="carousel-card"
//                 style={{
//                   flex: `0 0 ${100 / slidesToShow}%`,
//                   boxSizing: 'border-box'
//                 }}>
//                   <button
//                     className="close-button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemove(product.id);
//                     }}>X</button>
//                     <img
//                       src={currentStyle.results[0].photos[0].thumbnail_url}
//                       className="carousel-card-image"/>
//                     <div className="card-content">
//                       <h6>{product.category}</h6>
//                       <h3>{product.name}</h3>
//                       <h5 className="card-price">{displayPrice(currentStyle)}</h5>
//                       <h5 className="card-star-rating">star rating</h5>
//                     </div>
//                 </div>
//               ))}
//         </div>
//           {outfit.length > slidesToShow && (
//             <div>
//               <button
//                 className="prev"
//                 onClick={handlePrev}
//                 disabled={index === 0}>Previous</button>
//               <button
//                 className="next"
//                 onClick={handleNext}
//                 disabled={index >= outfit.length - 1}>Next</button>
//             </div>
//           )}
//       </div>
//       )}
//     </div>
//   </div>
// );
