import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ReviewsActions } from '../../store/ReviewsSlice.js';
import ReviewsListCard from './ReviewsListCard.jsx';
import AddReviewModule from './AddReviewModule.jsx';

const ReviewsList = ({ setCurrPage, currPage, setSort, sort }) => {
  const ReviewsData = useSelector(store => store.ReviewsData);
  const [numOfReviewCards, setNumOfReviewCards] = useState(0);
  const [formRating, setFormRating] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controls modal visibility

  const handleOpenModal = () => {
    setModalIsOpen(true); // Open modal when button is clicked
  };

  const handleCloseModal = () => {
    setModalIsOpen(false); // Close modal
  };

  // const handleAddReview = () => {
  //   return (
  //     <>
  //       {/* Render button if modal is closed */}
  //       {!modalIsOpen ? (
  //         <button onClick={() => setModalIsOpen(true)}>+ ADD REVIEW</button>
  //       ) : (
  //         // Pass modalIsOpen and closeModal as props to child component
  //         <AddReviewModule closeModal={() => setModalIsOpen(false)} />
  //       )}
  //     </>
  //   );
  // };

  const handleReviewCardList = () => {
    if (ReviewsData.Reviews.length > 2) {
      return <button onClick={() => setNumOfReviewCards(Math.min(numOfReviewCards + 2), 5)}>MORE REVIEWS</button>;
    } else {
      return null;
    }
  };

  const handleSize = () => {
    if (!Array.isArray(ReviewsData.Reviews)) {
      return '###';
    }
    return ReviewsData.Reviews.length;
  };

  const handleMap = (extra) => {
    if (numOfReviewCards > 5) {
      setNumOfReviewCards(0);
      setCurrPage(currPage + 1);
    }
    const currCards = Math.min(2 + extra, ReviewsData.Reviews.length);
    if (!Array.isArray(ReviewsData.Reviews)) {
      return '###';
    }
    return ReviewsData.Reviews.slice(0, currCards).map(review => <ReviewsListCard review={review} />);
  };

  return (
    <div>
      <h3>{handleSize()} reviews, sorted by SOMETHING page: {currPage}</h3>
      {handleMap(numOfReviewCards)}
      <div>
        {handleReviewCardList()}
        <button onClick={handleOpenModal}>+ ADD REVIEW</button>
        {modalIsOpen && (
        <AddReviewModule
          modalIsOpen={modalIsOpen}
          closeModal={handleCloseModal}
          setFormRating={setFormRating} // Pass state setter to Modal
          formRating={formRating} // Pass current rating state
        />
      )}
      </div>
    </div>
  );
};

export default ReviewsList;
