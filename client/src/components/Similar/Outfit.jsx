import React, { useState } from 'react';
import '../../input.css';

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

  // const handleRemove = (id) => {
  //   setOutfit(outfit.filter((item) => item.id !== id));
  // };

  // const handleNext = () => {
  //   setIndex((prevIndex) =>
  //     Math.min(prevIndex + 1, outfit.length - 1));
  // };

  // const handlePrev = () => {
  //   setIndex((prevIndex) =>
  //     Math.max(prevIndex - 1, 0));
  // };


  return (
    <div>
      <h3>Your Outfit</h3>
      <div className="outfit-container">
        <div className="outfit-card empty-card" onClick={handleAdd}>
          <button className="add-button">+</button>
          <h5>Add to Outfit</h5>
        </div>
      </div>
    </div>
  );
};

export default Outfit;