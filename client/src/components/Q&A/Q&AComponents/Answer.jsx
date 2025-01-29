/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({answer}) => {

  return (
  <div data-testid="answer">
    <h3 data-testid="answer-body"><b>A: </b></h3><p>{answer.answer_body}</p>
  </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};


export default Answer;