/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import '../../../../dist/output.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const SearchQuestions = () => {
  const handleSearch = (formData) => {
    const query = formData.get("query");
  }
  return (
  <form className="input-container" data-testid="search-questions" action={handleSearch}>
    <input name="query" className="input-box" type="search" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." style={{ width: '1000px' }}></input>
    <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
  </form>
  );
};


export default SearchQuestions;