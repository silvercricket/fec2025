import React, { useState } from 'react';
import '../../input.css';
import PropTypes from 'prop-types';
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

Compare.propTypes = {
  currentProduct: PropTypes.object.isRequired,
  starClicked: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Compare;