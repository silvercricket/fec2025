/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer.jsx';
import axios from 'axios';
const Answers = ({answers, setAnswers, question, setRefresh}) => {
  const [clicked, setClicked] = React.useState(false);
  const handleAnswers = () => {
    axios.get(process.env.API_URL + `/qa/questions/${question.question_id}/answers?count=2147483647`,{headers: {Authorization:process.env.AUTH_SECRET} })
    .then((result) => {
      setClicked(true);
      setAnswers(result.data.results);
    })
    .catch((err) => {
      console.error(err);
      alert('error while retrieving answers')
    });
  }
  const handleClose = () => {
    setClicked(false);
    setRefresh({});
  }
  return (
  <div data-testid="answers">
    {answers.length > 0 ? <h3 style={{margin: '.5em 0'}}><b>A: </b></h3> : <h3>No answers unfortunately 😞</h3>}
    {answers.map((answer) => <Answer key={answer.answer_id} answer={answer} setRefresh={setRefresh} isClicked={setClicked}/>)}
    <br/>
    {Object.keys(question.answers).length > 2 && !clicked ? <small onClick={handleAnswers}><b>Load More Answers</b></small> : (clicked ? <small onClick={handleClose}><b>Collapse Answers</b></small> : null)}
  </div>
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired
};

export default Answers;