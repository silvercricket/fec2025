import React from 'react';
import PropTypes from 'prop-types';

const Compare = ({ currentProduct, starClicked, onClose }) => {

  // console.log(starClicked.features);
  const allProperties = new Set([
    ...(currentProduct.features || []).map((f) => f.feature),
    ...(starClicked.features || []).map((f) => f.feature)
  ])

  return (
    <div
      className="modal-popup"
      data-testid="compare">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Product Comparison</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>{currentProduct.name}</th>
              <th>Feature</th>
              <th>{starClicked.name}</th>
            </tr>
          </thead>
          <tbody>
            {[...allProperties].map((property) => {
              const currentFeature = (currentProduct.features || []).find((f) => f.feature === property);
              const starFeature = (starClicked.features || []).find((f) => f.feature === property);
              return (
                <tr key={property}>
                <td>{currentFeature ? "✓" : ""}</td>
                <td>
                  {property}
                  {currentFeature?.value || starFeature?.value ? `: ${currentFeature?.value || starFeature?.value}` : ""}
                </td>
                <td>{starFeature ? "✓" : ""}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

Compare.propTypes = {
  currentProduct: PropTypes.object.isRequired,
  starClicked: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Compare;

