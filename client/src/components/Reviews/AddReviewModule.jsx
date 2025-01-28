import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

Modal.setAppElement('#root');

const AddReviewModule = ({modalIsOpen, closeModal, setFormRating, formRating}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = {
    fullStar: <FontAwesomeIcon icon={faStar} />,
    emptyStar: <FontAwesomeIcon icon={faRegularStar} />,
  };

  const ratingTexts = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  const handleRating = (index) => {
    setFormRating(index);
  };

  const handleHover = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {

  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <form action={() => handleSubmit()}> {/* Prevent form submission */}
  <h2>Please Rate:</h2>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div>
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button
            key={starIndex}
            type="button" // Prevents this button from submitting the form
            onMouseOver={() => handleHover(starIndex)}
            onClick={() => handleRating(starIndex)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer', padding: '5px' }}
          >
            {starIndex <= (hoverRating || formRating) ? stars.fullStar : stars.emptyStar}
          </button>
        );
      })}
    </div>
    <span style={{ marginLeft: '15px', fontSize: '16px', color: 'gray' }}>
      {ratingTexts[hoverRating || formRating]}
    </span>
  </div>
  <button type="button" onClick={closeModal}>
    Close Modal
  </button>
</form>
    </Modal>
  );
};

export default AddReviewModule;
