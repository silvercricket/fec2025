/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer.jsx';

const Answers = ({answers}) => {

  return (
  <div data-testid="answers">
    {answers.map((answer) => <Answer key={answer.answer_id} answer={answer}/>)}
  </div>
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
};

export default Answers;