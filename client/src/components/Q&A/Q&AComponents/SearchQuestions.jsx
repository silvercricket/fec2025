/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import '../../../../dist/output.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {QuestionsActions} from '../../../store/QuestionsSlice.js';
import PropTypes from 'prop-types';

const SearchQuestions = ({setRefresh}) => {
  const Product = useSelector(store => store.Product);
  const dispatch = useDispatch();
  const handleSearch = (formData) => {
    const query = formData.get("query");
    if (query.length < 3) {
      setRefresh({})
    } else {
      axios.get(process.env.API_URL + `/qa/questions?count=4&product_id=${44500}`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result)=>{
        var filtered = result.data.results.filter((question) => question.question_body.includes(query));
        if (filtered.length === 0) {
          alert('No questions found, if you need help please feel free to leave a question addressing your concern');
          return;
        }
        dispatch(QuestionsActions.setQuestions(filtered));
      })
      .catch(() => alert('error while retrieving questions'))
    }
  }
  return (
  <form className="input-container" data-testid="search-questions" action={handleSearch}>
    <input data-testid="query" name="query" className="input-box" type="search" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." style={{height: '40px'}}></input>
    <button data-testid="search" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
  </form>
  );
};

SearchQuestions.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export default SearchQuestions;