/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answers from './Answers.jsx';
const Question = ({question}) => {
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    axios.get(process.env.API_URL + `/qa/questions/${question.question_id}/answers?count=2`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        setAnswers(result.data.results);
      })
      .catch(() => alert('error while retrieving answers'));
  }, []);

  return (
    <div data-testid="question">
      <h3><b>Q: {question.question_body}</b></h3>
      <Answers answers={answers}/>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;