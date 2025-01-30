/*global*/
/*eslint no-undef: "error"*/
import React from 'react';
import {useSelector} from 'react-redux';
import Question from './Question.jsx';
import PropTypes from 'prop-types';

const Questions = ({setRefresh}) => {
  const QuestionsData = useSelector(store => store.QuestionsData);
  return (
  <div style={{maxHeight: `${window.innerHeight - 200}px`, overflow: 'auto'}} data-testid="questions">
    {QuestionsData.length > 0 ? [...QuestionsData].map((question) => {
      // console.log(typeof question);
      return (<Question key={question.question_id} question={question} setRefresh={setRefresh}/>)
    }) : <p><b>No questions here but feel free to add one</b></p>}
  </div>
  );
};

Questions.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export default Questions;