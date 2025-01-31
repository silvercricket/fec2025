/*global process*/
/*eslint no-undef: "error"*/
import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ReviewsActions} from '../../store/ReviewsSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import ReviewsListCardPhotos from './ReviewsListCardPhotos.jsx';

const ReviewsListCard = ({ review }) => {
  const [clickedHelp, setClickedHelp] = React.useState(false);
  const [clickedReport, setClickedReport] = React.useState(false);
  const [helpful, setHelpful] = React.useState(review.helpfulness);
  const stars = {
    fullStar: <FontAwesomeIcon icon={faStar} />,
    emptyStar: <FontAwesomeIcon icon={faRegularStar} />,
    halfStar: <FontAwesomeIcon icon={faStarHalf} />,
  }
  const handleRating = (rating) => {
    let ratingEle = [];
    let numStars = rating;
    for (let i = 0; i < Math.floor(numStars); i++) {
      ratingEle.push(<span key={`fullStar-${i}`}>{stars.fullStar}</span>);
    }
    if (numStars % 1 === 0.5) {
      ratingEle.push(<span key={`halfStar`}>{stars.halfStar}</span>);
    }
    for (let i = ratingEle.length; i < 5; i++) {
      ratingEle.push(<span key={`emptyStar-${i}`}>{stars.emptyStar}</span>);
    }

    return ratingEle;
  };
  const handleHelpfullness = () => {
    if (clickedHelp) {
      return;
    }
    setClickedHelp(true);
    setHelpful(helpful + 1);
    axios.put(`${process.env.API_URL}/reviews/${review.review_id}/helpful`,
    {
      review_id: review.review_id,
    },
    {
      headers: {
      Authorization:process.env.AUTH_SECRET
      }
    }
  )
  .then(res => {
    console.log('RESPOSE: ', res);
  })
  }
  const handleReport = () => {
    if (clickedReport) {
      return;
    }
    setClickedReport(true);
    axios.put(`${process.env.API_URL}/reviews/${review.review_id}/report`,
    {
      review_id: review.review_id,
    },
    {
      headers: {
      Authorization:process.env.AUTH_SECRET
      }
    }
  )
  .then(res => {
    console.log('RESPOSE: ', res);
  })
  }
  const handleTime = () => {
    const dateString = review.date;
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }
  const handleMap = () => {
    var currPhotos = 2;
    if(!Array.isArray(review.photos)) {
      return '###'
    }
    return (review.photos.slice(0, currPhotos).map((photo, index) => { return <ReviewsListCardPhotos key={photo.id || index} photo={photo}/>}))
  }

  return (
    <div >
      <h3>Stars: {handleRating(review.rating)}</h3>
      <small>{review.reviewer_name}, {handleTime()}</small>
      <h3>{review.summary}</h3>
      <p>{review.response}</p>
      <div>
        {handleMap()}
      </div>
      <small className='spacious'>
        Helpful?
        <button className='helpButton' onClick={() => handleHelpfullness()}>Yes</button>
        ({helpful})<span className='separator'> | </span>
        <button className='helpButton' onClick={() => handleReport()} >Report</button>
        </small>
        <br></br>
        <small>____________________________________________________________________________________________________</small>
    </div>
  );
}

export default ReviewsListCard;