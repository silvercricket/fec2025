/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const Question = ({question}) => {
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    axios.get(process.env.API_URL + `/qa/questions/${question.question_id}/answers?count=2`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        setAnswers(result.data.results);
      })
  }, []);

  return (
    <div data-testid="question">
      {console.log(answers)}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;