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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleSort = () => {
    setSort(document.getElementById('sort').value);
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleReviewCardList = () => {
    if (ReviewsData.Reviews.length > 2) {
      return <button onClick={() => {
        if (numOfReviewCards > 5) {
          setNumOfReviewCards(0);
          setCurrPage(currPage + 1);
        }
        setNumOfReviewCards(numOfReviewCards + 2)
      }}>MORE REVIEWS</button>;
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
    const currCards = Math.min(2 + extra, ReviewsData.Reviews.length);
    if (!Array.isArray(ReviewsData.Reviews)) {
      return '###';
    }
    return ReviewsData.Reviews.slice(0, currCards).map(review => <ReviewsListCard review={review} />);
  };

  return (
    <div>
      <h3>{handleSize()} reviews, {
        <section>
        <label htmlFor='sort'>Sorted on</label>
        <select onChange={handleSort} name="sort" id="sort">
          <option value="Relevent">Relevent</option>
          <option value="Helpful">Helpful</option>
          <option value="Newest">Newest</option>
        </select>
        </section>
        } page: {currPage}</h3>
      <div
        style={{
          height: '500px',      // Ensures the container has a fixed height
          overflow: 'auto',     // Allows scrolling within the container
          backgroundColor: 'white',  // Optional: to make sure the container is visible and stands out
        }}
      >
        {handleMap(numOfReviewCards)}
      </div>
      <div>
        {handleReviewCardList()}
        <button onClick={handleOpenModal}>+ ADD REVIEW</button>
        {modalIsOpen && (
        <AddReviewModule
          modalIsOpen={modalIsOpen}
          closeModal={handleCloseModal}
          setFormRating={setFormRating}
          formRating={formRating}
        />
      )}
      </div>
    </div>
  );
};

export default ReviewsList;
