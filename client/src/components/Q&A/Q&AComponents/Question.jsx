/*global*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers.jsx';
import CreateAnswer from './CreateAnswer.jsx';
import {useSelector} from 'react-redux';

const Question = ({question, setRefresh}) => {
  const [answersData, setAnswersData] = React.useState([])
  const [answers, setAnswers] = React.useState([]);
  const QuestionsData = useSelector(store => store.QuestionsData);
  React.useEffect(() => {
    var answerArray = []
    for(var key in question.answers) {
      answerArray.push(question.answers[key]);
    }
    setAnswersData(answerArray);
    setAnswers(answerArray.slice(0, 2));
  }, [QuestionsData]);
  return (
    <div data-testid="question">
      <div id="question">
        <h3 style={{margin: '.5em 0'}} data-testid="question-body"><b>Q: {question.question_body}</b></h3>
        <CreateAnswer question={question} setRefresh={setRefresh}/>
      </div>
      <Answers answers={answers} setAnswers={setAnswers} answersData={answersData} setAnswersData={setAnswersData} question={question} setRefresh={setRefresh}/>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired
};

export default Question;