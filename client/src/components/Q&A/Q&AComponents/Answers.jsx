/*global*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer.jsx';
const Answers = ({answers, setAnswers, answersData, setAnswersData, question, setRefresh}) => {
  const [clicked, setClicked] = React.useState(false);
  const handleAnswers = () => {
    setClicked(true);
    const temp = answersData;
    setAnswersData(answers);
    setAnswers(temp);
  }
  const handleClose = () => {
    setClicked(false);
    const temp = answersData;
    setAnswersData(answers);
    setAnswers(temp);
  }
  return (
  <div data-testid="answers">
    {answers.length > 0 ? <h3 style={{margin: '.5em 0'}}><b>A: </b></h3> : <h3>No answers unfortunately 😞</h3>}
    {answers.map((answer) => <Answer key={answer.id || answer.answer_id} answer={answer} setRefresh={setRefresh} isClicked={setClicked}/>)}
    <br/>
    {Object.keys(question.answers).length > 2 && !clicked ? <small onClick={handleAnswers}><b>Load More Answers</b></small> : (clicked ? <small onClick={handleClose}><b>Collapse Answers</b></small> : null)}
  </div>
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired,
  answersData: PropTypes.array.isRequired,
  setAnswersData: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired
};

export default Answers;