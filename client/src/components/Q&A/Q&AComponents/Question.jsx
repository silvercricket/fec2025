/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answers from './Answers.jsx';
import CreateAnswer from './CreateAnswer.jsx';

const Question = ({question}) => {
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    axios.get(process.env.API_URL + `/qa/questions/${question.question_id}/answers?count=2`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        setAnswers(result.data.results);
      })
      .catch((err) => {
        console.error(err);
        alert('error while retrieving answers')
      });
  }, []);

  /*
  <div id="HASH" class="blue-msg">
<span id="time-HASH" class="smalltext">9 months 2 weeks ago</span>
<span class="ios-circle">MESSAGE HERE</span>
</div>*/
  return (
    <div data-testid="question">
      <div id="question">
        <h3 data-testid="question-body"><b>Q: {question.question_body}</b></h3>
        <p>Test</p>
      </div>
      <Answers answers={answers}/>
      <CreateAnswer/>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;