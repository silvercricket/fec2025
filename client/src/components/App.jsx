import React, {useState, useEffect}  from 'react';

import axios from 'axios';
import Overview from './Overview/overview.jsx';
import QA from './Q&A/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Similar from './Similar/similar.jsx';

<<<<<<< HEAD
=======
//send get request for specific productID
//axios.get(path.join(API_URL, 'products', productID),{headers: {Authorization:process.env.AUTH_SECRET }})
>>>>>>> 192b64a0950b687fa42ea01fb4e48b7ca050603c
const App = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {

    axios.get(process.env.API_URL + 'products',{headers: {Authorization:process.env.AUTH_SECRET, } })
    .then((result)=>{
      console.log(result);
      console.log(result.data);
      setProduct(result.data[0])
    })
<<<<<<< HEAD
=======

>>>>>>> 192b64a0950b687fa42ea01fb4e48b7ca050603c
  },[])


  return(
  <div>
    Hello World
    <Overview product={product} />
    <Similar product={product}/>
    <Reviews product={product} setProduct={setProduct}/>
    <QA product={product}/>

  </div>
);
}

export default App;