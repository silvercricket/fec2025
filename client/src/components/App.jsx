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
import logo from '../../img/east_blue_logo.jpg';

const App = () => {
  const Product = useSelector(store => store.Product);
  const dispatch = useDispatch();

  var product = Product.id ||  40344;

  useEffect(() => {
    axios.get(`${process.env.API_URL}/products/${product}`,{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        dispatch(ProductActions.setProduct(result.data));
      })
      .catch((err) => {
        if (err.response.status === 429) {
          alert('Sorry traffic is full please refresh your browser');
        } else {
          alert('Error while loading browser')
        }
      })
  },[Product.id])

  return(
  <div className="dark" data-testid="app">
    <div className="logo-container">
      <img className="logo" src={logo} alt="" />
    </div>
    <div className="app-content">
    <Overview/>
    <Similar/>
    <QA/>
    <Reviews />
    </div>
  </div>
);
}

export default App;