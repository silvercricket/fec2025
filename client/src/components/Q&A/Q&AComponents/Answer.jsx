/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({answer}) => {

  return (
  <div data-testid="answer">
    {answer.body}
  </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};


export default Answer;