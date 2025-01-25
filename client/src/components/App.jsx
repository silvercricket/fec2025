
import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Overview from './Overview/overview.jsx';
import QA from './Q&A/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Similar from './Similar/similar.jsx';
import {ProductActions} from '../store/ProductSlice.js';

const App = () => {
  const Product = useSelector(store => store.Product);
  const dispatch = useDispatch();
  useEffect(() => {

    axios.get(process.env.API_URL + 'products',{headers: {Authorization:process.env.AUTH_SECRET, } })
    .then((result)=>{
      console.log(result.data[0]);
      dispatch(ProductActions.setProduct(result.data[0]));
      console.log(ProductActions.setProduct);
    })

  },[])


  return(
  <div>
    <Overview/>
    <Similar Product={Product}/>
    <Reviews Product={Product}/>
    <QA Product={Product}/>
  </div>
);
}

export default App;