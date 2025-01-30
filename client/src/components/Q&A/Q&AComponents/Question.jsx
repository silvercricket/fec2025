/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answers from './Answers.jsx';
import CreateAnswer from './CreateAnswer.jsx';
import {useSelector} from 'react-redux';

const Question = ({question, setRefresh}) => {
  const [answers, setAnswers] = React.useState([]);
  const QuestionsData = useSelector(store => store.QuestionsData);
  React.useEffect(() => {
    axios.get(process.env.API_URL + `/qa/questions/${question.question_id}/answers?count=2`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        setAnswers(result.data.results);
      })
      .catch((err) => {
        if (err.response.status === 429) {
          alert('Sorry traffic is full please refresh your browser');
        } else {
          alert('error while retrieving answers');
        }
      });
  }, [QuestionsData]);

  /*
  <div id="HASH" class="blue-msg">
<span id="time-HASH" class="smalltext">9 months 2 weeks ago</span>
<span class="ios-circle">MESSAGE HERE</span>
</div>*/
  return (
    <div data-testid="question">
      <div id="question">
        <h3 style={{margin: '.5em 0'}} data-testid="question-body"><b>Q: {question.question_body}</b></h3>
        <CreateAnswer question={question} setRefresh={setRefresh}/>
      </div>
      <Answers answers={answers} setAnswers={setAnswers} question={question} setRefresh={setRefresh}/>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired
};

export default Question;