import React, { useState } from 'react';
import '../../../dist/styles/index.css';

const Compare = ({ currentProduct, starClicked, onClose }) => {

  return (
    <div className="modal-popup">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Product Comparison</h3>
        <h2>TABLE</h2>
      </div>
    </div>
  )
};

export default Compare;