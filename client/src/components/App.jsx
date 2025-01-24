import React, {useState, useEffect}  from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Overview from './Overview/overview.jsx';
import QA from './Q&A/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Similar from './Similar/similar.jsx';

const App = () => {
  const Product = useSelector(store => store.Product);

  useEffect(() => {

    axios.get(process.env.API_URL + 'product',{headers: {Authorization:process.env.AUTH_SECRET, } })
    .then((result)=>{
      setProduct(result.data[0])
    })
  },[])


  return(
  <div>
    Hello World
    <Overview Product={Product} />
    <Similar Product={Product}/>
    <Reviews Product={Product} setProduct={setProduct}/>
    <QA Product={Product}/>
  </div>
);
}

export default App;