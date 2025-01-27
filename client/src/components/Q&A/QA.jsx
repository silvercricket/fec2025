import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from  'react';
import axios from 'axios';
import {QAActions} from '../../store/QASlice.js';
const QA = () => {
  const Product = useSelector(store => store.Product);
  const QAData = useSelector(store => store.QAData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Product.product.id) {
      axios.get(process.env.API_URL + '/qa/questions?count=4&product_id=' + Product.product.id,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result)=>{
        dispatch(QAActions.setQuestions(result.data.results));
      })
      .catch((err) => console.error(err))
    }
  },[Product.product.id])

  return (
  <div data-testid="qa">
  </div>
  );
};


export default QA;