import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

Modal.setAppElement('#root');

const AddReviewModule = ({modalIsOpen, closeModal, setFormRating, formRating}) => {
  const ReviewsData = useSelector(store => store.ReviewsData);
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
  const handleCharacteristics = () => {
    const listOfChars = ['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit'];
    for (var characteristic of ReviewsData.Meta.characteristics) {

    }
  }
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <form action={() => handleSubmit()}> {/* Prevent form submission */}
      <h2>Please Rate:</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          {/*---------------------STAR RATING----------------------------- */}
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
      {/*---------------------STAR RATING----------------------------- */}
      {/*---------------------RECOMMEND----------------------------- */}
      <section>
        <fieldset>
          <legend>Would you recommend this product:</legend>
          <div>
            <input type="radio" id="form-recommend" name="recommend" required={true} value={true} />
            <label htmlFor="form-recommend">Yes</label>

            <input type="radio" id="form-do-not-recommend" name="recommend" value={false} />
            <label htmlFor="form-do-not-recommend">No</label>
          </div>
        </fieldset>
      </section>
      {/*---------------------RECOMMEND----------------------------- */}
      {/*---------------------CHARACTERISTICS----------------------------- */}
      {/*handleCharacteristics()*/}
      {/*---------------------CHARACTERISTICS----------------------------- */}
       {/*---------------------SUMMARY----------------------------- */}
       <section>
        <input id='form-summary' size='60' maxLength="60" required={true} placeholder={'Example: Best purchase ever!'}></input>
      </section>
      {/*---------------------SUMMARY----------------------------- */}
      <button type="button" onClick={closeModal}>
        Close Modal
      </button>
    </form>
    </Modal>
  );
};

export default AddReviewModule;
