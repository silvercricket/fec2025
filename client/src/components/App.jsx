/*global process*/
/*eslint no-undef: "error"*/
import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Overview from './Overview/overview.jsx';
import QA from './Q&A/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Similar from './Similar/similar.jsx';
import {ProductActions} from '../store/ProductSlice.js';

const App = () => {

  const Product = useSelector(store => store.Product);
  const dispatch = useDispatch();

  var product = Product.product.id ||  40344;

  useEffect(() => {
    axios.get(`${process.env.API_URL}/products/${product}`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        dispatch(ProductActions.setProduct(result.data));
      })
      .catch((err) => {
        console.error('App GET error', err);
      });
  },[Product.product.id]);

  return(
  <div data-testid="app">
    <Overview/>
    <Similar/>
    <QA/>
    <Reviews/>
  </div>
);
}

export default App;