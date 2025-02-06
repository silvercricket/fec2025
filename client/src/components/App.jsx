/*global process*/
/*eslint no-undef: "error"*/
import React, { lazy, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Overview from './Overview/overview.jsx';
import {ProductActions} from '../store/ProductSlice.js';
import PropTypes from 'prop-types';
const QA = lazy(() => import('./Q&A/QA.jsx'));
const Reviews = lazy(() => import('./Reviews/Reviews.jsx'));
const Similar = lazy(() => import('./Similar/similar.jsx'));
const swal = lazy(() => import('sweetalert'));

const App = ({logo}) => {
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
          swal('Sorry!', 'Traffic is full please refresh your browser', 'warning');
        } else {
          swal('Error!', 'Error while retrieving questions', 'error');
        }
      })
  },[Product.id])

  return(
  <div data-testid="app">
    <div className="logo-container">
      <img className="logo" src={logo} alt="East Blue Logo" />
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

App.propTypes = {
  logo: PropTypes.string,
}

export default App;