/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from  'react';
import axios from 'axios';
import {QuestionsActions} from '../../store/QuestionsSlice.js';
import Questions from './Q&AComponents/Questions.jsx';
import SearchQuestions from './Q&AComponents/SearchQuestions.jsx';
const QA = () => {
  const Product = useSelector(store => store.Product);
  const dispatch = useDispatch();
  console.log(process.env.API_URL + '/qa/questions?count=4&product_id=' + Product.product.id);
  useEffect(() => {
    if (Product.product.id) {
      axios.get(process.env.API_URL + '/qa/questions?count=4&product_id=' + Product.product.id,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result)=>{
        dispatch(QuestionsActions.setQuestions(result.data.results));
      })
      .catch((err) => console.error(err))
    }
  },[Product.product.id])

  return (
  <div data-testid="qa">
    <h3>Questions & Answers</h3>
    <SearchQuestions/>
    <br/>
    <Questions/>
  </div>
  );
};


export default QA;