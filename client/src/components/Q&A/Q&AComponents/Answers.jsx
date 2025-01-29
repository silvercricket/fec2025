/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer.jsx';
import axios from 'axios';
const Answers = ({answers, setAnswers, question}) => {
  const handleAnswers = () => {
    axios.get(process.env.API_URL + `/qa/questions/${question.question_id}/answers?count=2147483647`,{headers: {Authorization:process.env.AUTH_SECRET} })
    .then((result) => {
      console.log(result.data.results);
      setAnswers(result.data.results);
    })
    .catch((err) => {
      console.error(err);
      alert('error while retrieving answers')
    });
  }
  return (
  <div data-testid="answers">
    {answers.map((answer) => <Answer key={answer.answer_id} answer={answer}/>)}
    {answers.length === 2 ? <small onClick={handleAnswers}><b>Load More Answers</b></small> : null}
  </div>
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

export default Answers;