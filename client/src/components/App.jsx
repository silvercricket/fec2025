<<<<<<< HEAD
import React, {useState, useEffect}  from 'react';
=======
import React, {useEffect}  from 'react';
>>>>>>> main
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Overview from './Overview/overview.jsx';
import QA from './Q&A/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Similar from './Similar/similar.jsx';
import {ProductActions} from '../store/ProductSlice.js';

const App = () => {
  const Product = useSelector(store => store.Product);
<<<<<<< HEAD
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(process.env.API_URL + 'products',{headers: {Authorization:process.env.AUTH_SECRET, } })
    .then((result)=>{
      dispatch(ProductActions.setProduct(result.data[0]));
    })
=======
  useEffect(() => {
    axios.get(process.env.API_URL + '/products',{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result)=>{
        useDispatch(ProductActions.setProduct(result.data[0]));
      })
>>>>>>> main
  },[])


  return(
<<<<<<< HEAD
  <div>
    <Overview Product={Product} />
    <Similar Product={Product}/>
    <QA Product={Product}/>
    <Reviews Product={Product} />

  </div>
=======
  <>
    {console.log(Product.product)}
    <Overview/>
    <Similar/>
    <QA/>
    <Reviews/>
  </>
>>>>>>> main
);
}

export default App;