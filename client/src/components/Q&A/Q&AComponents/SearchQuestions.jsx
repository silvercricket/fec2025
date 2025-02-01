/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import '../../../../dist/styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {QuestionsActions} from '../../../store/QuestionsSlice.js';
import {SearchActions} from '../../../store/SearchSlice.js';

const SearchQuestions = () => {
  const QuestionsData = useSelector(store => store.QuestionsData);
  const [input, setInput] = React.useState('');
  const [unfiltered, setUnfiltered] = React.useState([]);
  const dispatch = useDispatch();
  const handleSearch = () => {
    if (JSON.stringify(unfiltered) !== JSON.stringify(QuestionsData)) {
      setUnfiltered(QuestionsData);
    }
    if (input.length < 3) {
      dispatch(SearchActions.setSearch(false));
      return;
    } else {
      dispatch(SearchActions.setSearch(true));
    }
    var filtered = QuestionsData.filter((question) => question.question_body.includes(input));
    if (filtered.length === 0) {
      alert('No questions found, if you need help please feel free to leave a question addressing your concern');
      dispatch(QuestionsActions.setQuestions(unfiltered));
      return;
    }
    dispatch(QuestionsActions.setQuestions(filtered));
  }
  const handleInput = (event) => {
    setInput(event.target.value)
  };
  const handleReset = () => {
    dispatch(SearchActions.setSearch(false));
    if (unfiltered.length === 0) {
      return;
    }
    dispatch(QuestionsActions.setQuestions(unfiltered));
  }
  return (
  <div className="input-container" data-testid="search-questions">
    <input data-testid="query" name="query" className="input-box" type="search" value={input} onChange={handleInput} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onClick={handleReset} style={{height: '40px'}} minLength="3"></input>
    <button data-testid="search" type="submit" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
  </div>
  );
};


export default SearchQuestions;