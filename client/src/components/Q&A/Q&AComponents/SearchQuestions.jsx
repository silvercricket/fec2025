/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import '../../../../dist/styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {QuestionsActions} from '../../../store/QuestionsSlice.js';

const SearchQuestions = () => {
  const QuestionsData = useSelector(store => store.QuestionsData)
  const dispatch = useDispatch();
  const handleSearch = (formData) => {
    const query = formData.get("query");
    var filtered = QuestionsData.filter((question) => question.question_body.includes(query));
    if (filtered.length === 0) {
      alert('No questions found, if you need help please feel free to leave a question addressing your concern');
      return;
    }
    dispatch(QuestionsActions.setQuestions(filtered));
  }
  return (
  <form className="input-container" data-testid="search-questions" action={handleSearch}>
    <input data-testid="query" name="query" defaultValue={''} className="input-box" type="search" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." style={{height: '40px'}}></input>
    <button data-testid="search" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
  </form>
  );
};


export default SearchQuestions;