/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from  'react';
import axios from 'axios';
import {QuestionsActions} from '../../store/QuestionsSlice.js';
import Questions from './Q&AComponents/Questions.jsx';
import SearchQuestions from './Q&AComponents/SearchQuestions.jsx';

import CreateQuestion from './Q&AComponents/CreateQuestion.jsx';

const QA = () => {
  const [refresh, setRefresh] = React.useState({});
  const Product = useSelector(store => store.Product);
  const [questions, setQuestions] = React.useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    if (Product.id) {
      axios.get(process.env.API_URL + `/qa/questions?count=2147483647&product_id=${Product.id}`,{headers: {Authorization:process.env.AUTH_SECRET} })
        .then((result)=>{
          setQuestions(result.data.results);
          const action = result.data.results.slice(0, 4);
          dispatch(QuestionsActions.setQuestions(action));
        })
        .catch((err) => {
          if (err.response && err.response.status === 429) {
            alert('Sorry traffic is full please refresh your browser');
          } else {
            alert('error while retrieving questions');
          }
        })
    }
  },[Product.id, refresh])

  return (
    <>
      <div data-testid="qa">
        <h3>Questions & Answers</h3>
        <SearchQuestions setRefresh={setRefresh}/>
        <br/>
        <Questions refresh={refresh} setRefresh={setRefresh}/>
        <CreateQuestion questions={questions} setQuestions={setQuestions} setRefresh={setRefresh}/>
      </div>
      <br/>
    </>
  );
};


export default QA;