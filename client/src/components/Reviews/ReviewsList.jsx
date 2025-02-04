import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import ReviewsListCard from './ReviewsListCard.jsx';
import AddReviewModule from './AddReviewModule.jsx';
import PropTypes from 'prop-types';

const ReviewsList = ({ setCurrPage, currPage, setSort }) => {
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
    if (ReviewsData.length > 2) {
      return <button className='more-reviews-button' onClick={() => {
        if (numOfReviewCards + 2 > 5) {
          setNumOfReviewCards(0);
          setCurrPage(currPage + 1);
        } else {
          setNumOfReviewCards(numOfReviewCards + 2);
        }
      }}>MORE REVIEWS</button>;
    } else {
      return null;
    }
  };

  const handleSize = () => {
    if (!Array.isArray(ReviewsData)) {
      return '###';
    }
    return ReviewsData.length;
  };

  const handleMap = (extra) => {
    const currCards = 2 + extra;
    const currListPage = ((Math.floor(ReviewsData.length / 5) - 1) * 5);
    if (!Array.isArray(ReviewsData)) {
      return '###';
    }
    return ReviewsData.slice(currListPage, currCards).map((review, index) => <ReviewsListCard review={review} key={`${review.id} - ${index}`} />);
  };

  return (
    <div data-testid="list-view" id="list-view">
      <h3>
        {handleSize()} reviews,
        <section>
          <label htmlFor="sort">Sorted on</label>
          <select onChange={handleSort} name="sort" id="sort">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </section>
        page: {currPage}
      </h3>
      <div className="reviewList-container">
        {handleMap(numOfReviewCards)}
      </div>
      <div className="review-list">
        {handleReviewCardList()}
        <button className="add-review-button" onClick={handleOpenModal}>+ ADD REVIEW</button>
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

ReviewsList.propTypes = {
  setCurrPage:PropTypes.func.isRequired,
  currPage:PropTypes.number.isRequired,
  setSort:PropTypes.func.isRequired,
  sort:PropTypes.string.isRequired,
};

export default ReviewsList;
