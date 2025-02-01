/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Photo from './Photo.jsx';

const Answer = ({answer, setRefresh, isClicked}) => {

  const [yes, setYes] = React.useState(false);

  const handleYes = () => {
    if (!yes) {
      axios.put(process.env.API_URL + `/qa/answers/${answer.id}/helpful`, {}, {headers: {Authorization:process.env.AUTH_SECRET} })
        .then( () => {
          isClicked(false);
          setYes(true);
          setRefresh({});
          alert('Thank you for your help!!! 🤩');
        })
        .catch(() => {
          alert('error while marking question as helpful')
        })
    } else {
      alert('You cannot mark a question as helpful more than once ❌')
    }
  }
  const handleReport = () => {
    axios.put(process.env.API_URL + `/qa/answers/${answer.id}/report`, {}, {headers: {Authorization:process.env.AUTH_SECRET} })
        .then( () => {
          isClicked(false);
          setYes(true);
          setRefresh({});
          alert('Thank you for reporting this inappropriate answer 🫡');
        })
        .catch(() => {
          alert('error while marking question as helpful')
        })
    }

  return (
    <>
      <div id="answer" data-testid="answer">
        <p id="answer-body" data-testid="answer-body">{answer.body}</p>
        {answer.photos.map(photo => <Photo key={photo} photo={photo}/>)}
        {answer.photos.length > 0 ? <br/> : null}
        <small>by {answer.answerer_name}, {new Date(answer.date).toLocaleString(undefined, {year: 'numeric',  day: 'numeric', month: 'long'})} | Helpful?  <u onClick={handleYes}>Yes</u> {'(' + answer.helpfulness + ')'} | <u onClick={handleReport}>Report</u></small>
      </div>
    </>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
  isClicked: PropTypes.func.isRequired
};


export default Answer;