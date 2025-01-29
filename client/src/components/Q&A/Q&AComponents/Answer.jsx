/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const Answer = ({answer, setRefresh, isClicked}) => {
  const [clicked, setClicked] = React.useState(false)
  const handleYes = () => {
    if (!clicked) {
      axios.put(process.env.API_URL + `/qa/answers/${answer.answer_id}/helpful`, {}, {headers: {Authorization:process.env.AUTH_SECRET} })
        .then( () => {
          isClicked(false);
          setClicked(true);
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
    axios.put(process.env.API_URL + `/qa/answers/${answer.answer_id}/report`, {}, {headers: {Authorization:process.env.AUTH_SECRET} })
        .then( () => {
          isClicked(false);
          setClicked(true);
          setRefresh({});
          alert('Thank you for reporting this inappropriate answer 🫡');
        })
        .catch(() => {
          alert('error while marking question as helpful')
        })
    }
  return (
    <div data-testid="answer">
      {console.log(answer)}
      <p>{answer.body}</p>
      <small>by {answer.answerer_name}, {new Date(answer.date).toLocaleString(undefined, {year: 'numeric',  day: 'numeric', month: 'long'})} | Helpful?  <u onClick={handleYes}>Yes</u> {'(' + answer.helpfulness + ')'} | <u onClick={handleReport}>Report</u></small>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
  isClicked: PropTypes.func.isRequired
};


export default Answer;