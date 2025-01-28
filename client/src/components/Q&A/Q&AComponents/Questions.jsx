/*global*/
/*eslint no-undef: "error"*/
import React from 'react';
import {useSelector} from 'react-redux';
import Question from './Question.jsx';
import CreateQuestion from './CreateQuestion.jsx';
const Questions = () => {
  const QuestionsData = useSelector(store => store.QuestionsData);
  return (
  <div data-testid="questions">
    {console.table(QuestionsData)}
    {QuestionsData.length > 0 ? [...QuestionsData].map((question) => {
      console.log(typeof question);
      return (<Question key={question.question_id} question={question}/>)
    }) : <p><b>No questions here but feel free to add one</b></p>}
    <CreateQuestion/>
  </div>
  );
};


export default Questions;