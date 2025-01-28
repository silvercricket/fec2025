/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import {useSelector} from 'react-redux';
const Questions = () => {
  const QuestionsData = useSelector(store => store.QuestionsData);
  return (
  <div data-testid="questions">
    {console.log(QuestionsData)}
    list of questions goes here
  </div>
  );
};


export default Questions;