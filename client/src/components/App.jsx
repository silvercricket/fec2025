/*global process*/
/*eslint no-undef: "error"*/
import React, {useEffect}  from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Overview from './Overview/overview.jsx';
import QA from './Q&A/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Similar from './Similar/similar.jsx';

import {ProductActions} from '../store/ProductSlice.js';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('HELP');
    axios.get(process.env.API_URL + '/products',{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result)=>{
        dispatch(ProductActions.setProduct(result.data[0]));
        // console.log(result.data[0]);
      })
      .catch((err) => {
        if (err.response.status === 429) {
          alert('Sorry traffic is full please refresh your browser');
        } else {
          alert('Error while loading browser')
        }
      })
  },[])

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