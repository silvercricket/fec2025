import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';



const Similar = ({product, setProduct}) => {

  const [similar, setSimilar] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1', {headers: {Authorization: process.env.AUTH_SECRET}})
    .then((response) => {
      setProducts(response.data);
    })
    .catch((err) => {
      console.error('Similar failed', err);
    })
  }

    React.useEffect(() => {
      getProducts()
    }, []);

  return (
    <>
      <div>
        Similar products go here!
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};


export default Similar;

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/related
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles