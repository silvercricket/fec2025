import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import '../../input.css';
import {RelatedActions} from '../../store/RelatedSlice.js';
import {ProductActions} from '../../store/ProductSlice.js';
import Carousel from './Carousel.jsx';


const Similar = () => {
  const Product = useSelector(store => store.Product);
  const Related = useSelector(store => store.Related);
  const dispatch = useDispatch();

  const getProducts = () => {
    axios.get(process.env.API_URL + `/products/?product_id=${Product.product.id}`, {headers: {Authorization: process.env.AUTH_SECRET}})
    .then((response) => {
      dispatch(RelatedActions.setRelated(response.data));
    })
    .catch((err) => {
      console.error('Related GET failed', err);
    })
   }

    React.useEffect(() => {
      if (Product.product.id) {
        getProducts();
      }
    }, [Product.product.id]);


    const handleCardClick = (product) => {
      console.log(Product.product.id)
      dispatch(ProductActions.setProduct(product));
    };

    const handleStarClick = (currentProduct, compareProduct) => {
      console.log('star click', currentProduct, compareProduct);
    }




  return (
    <div data-testid="similar">
      <div>
        Similar products go here!
      </div>
        <Carousel
          items={Related.related}
          handleCardClick={handleCardClick}
          handleStarClick={handleStarClick}
          currentProduct={Product.product} />
    </div>
  );
};


export default Similar;

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/related
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&page=2

// product[0] = {
//   campus: "hr-rfp"
//   category: "Jackets"
//   created_at: "2021-08-13T14:38:44.509Z"
//   default_price: "140.00"
//   description: "The So Fatigues will wake you up and fit you in.
//                  This high energy camo will have you blending in to even the
//                  wildest surroundings."
//   id: 40344
//   name: "Camo Onesie"
//   slogan: "Blend in to your crowd"
//   updated_at: "2021-08-13T14:38:44.509Z"
// }