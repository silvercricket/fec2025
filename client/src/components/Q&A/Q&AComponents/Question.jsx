/*global*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';

const Question = ({question}) => {
  return (
    <div data-testid="question">
      {question.question_body}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;