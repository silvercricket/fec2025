/*global process*/
/*eslint no-undef: "error"*/
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import '../../../dist/styles/index.css';
// import {RelatedActions} from '../../store/RelatedSlice.js';
import {ProductActions} from '../../store/ProductSlice.js';
import Carousel from './Carousel.jsx';
import Outfit from './Outfit.jsx';
import Compare from './Compare.jsx';


const Similar = () => {
  const Product = useSelector(store => store.Product);
  // const Related = useSelector(store => store.Related);
  const dispatch = useDispatch();

  const [currentProduct, setCurrentProduct] = useState(null);
  const [styles, setStyles] = useState([]);
  const [products, setProducts] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [starClicked, setStarClicked] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(null);

  const getStyles = (productIds) => {
    if (!productIds || productIds.length === 0) {
      console.error('Product Id undefined in Similar Styles');
      return;
    }
    const styleRequests = productIds.map((pid) =>
      axios.get(`${process.env.API_URL}/products/${pid}/styles`, {headers: {Authorization: process.env.AUTH_SECRET}}));
    Promise.all(styleRequests)
      .then((responses) => {
        const allStyles = responses.map((response, index) => ({
          id: productIds[index],
          results: response.data.results
        }));
        setStyles(allStyles);
      })
      .catch((err) => {
        console.error('Styles GET failed', err);
      })
  };

  const getProducts = (productIds) => {
    if (!productIds || productIds.length === 0) {
      console.error('Product Id undefined in Similar Products');
      return;
    }
    const productRequests = productIds.map((pid) =>
      axios.get(`${process.env.API_URL}/products/${pid}`, {headers: {Authorization: process.env.AUTH_SECRET}}));
    Promise.all(productRequests)
      .then((responses) => {
        const allRelatedProducts = responses.map((response, index) => ({
          id: productIds[index],
          ...response.data
        }));
        setProducts(allRelatedProducts);
      })
      .catch((err) => {
        console.error('Styles GET failed', err);
      })
  }

  const getRelated = () => {
    if (!Product.id) {
      console.error('Product Id undefined in Similar Product');
      return;
    }
    axios.get(`${process.env.API_URL}/products/${Product.id}/related`, {headers: {Authorization: process.env.AUTH_SECRET}})
    .then((response) => {
      const relatedProductIds = response.data;
      // dispatch(RelatedActions.setRelated(response.data));
      getStyles(relatedProductIds);
      getProducts(relatedProductIds);
    })
    .catch((err) => {
      console.error('Related GET failed', err);
    })
   };

   const getCurrentDetails = (currentId) => {
    axios.get(`${process.env.API_URL}/products/${currentId}/styles`, {headers: {Authorization: process.env.AUTH_SECRET}})
      .then((response) => {
        setCurrentStyle(response.data);
      })
      .catch((err) => {
        console.error('current style GET error', err);
      })
    }

    useEffect(() => {
      if (Product.id) {
        setCurrentProduct(Product);
        getRelated();
        getCurrentDetails(Product.id);
      }
    }, [Product.id]);

    useEffect(() => {
      if (products.length > 0 && styles.length > 0) {
        const combined = products.map((product) => {
          const style = styles.find((s) => s.id === product.id);
          return {
            ...product,
            ...style
          };
        });
        setCombinedData(combined);
      }
    }, [products, styles]);

    const handleCardClick = (product) => {
      dispatch(ProductActions.setProduct(product));
    };

    const handleStarClick = (product) => {
      setStarClicked(product);
      setIsOpen(true);
    };

    const handleCloseModal = () => {
      setStarClicked(null);
      setIsOpen(false);
    };



  return (
    <div data-testid="similar">
      <h3>Related Products</h3>
        {combinedData.length > 0 ? (
          <Carousel
          items={combinedData}
          handleCardClick={handleCardClick}
          handleStarClick={handleStarClick}
          currentProduct={currentProduct}
          currentStyle={currentStyle} />
        ) : (
          <div>Loading related products...</div>
        )}
        {modalIsOpen && (
          <Compare
            currentProduct={currentProduct}
            currentStyle={currentStyle}
            starClicked={starClicked}
            onClose={handleCloseModal} />
        )}
        <Outfit
          currentProduct={currentProduct}
          currentStyle={currentStyle} />
      </div>
  );
};



export default Similar;

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/related
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&page=2
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&sort=newest

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

// /id
// {
// 	"id": 11,
// 	"name": "Air Minis 250",
// 	"slogan": "Full court support",
// 	"description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
// 	"category": "Basketball Shoes",
// 	"default_price": "0",
// 	"features": [
//   	{
// 			"feature": "Sole",
// 			"value": "Rubber"
// 		},
//   	{
// 			"feature": "Material",
// 			"value": "FullControlSkin"
// 	],
// }


// /styles
// {
// 	"product_id": "1",
// 	"results": [
//   	{
// 			"style_id": 1,
// 			"name": "Forest Green & Black",
// 			"original_price": "140",
// 			"sale_price": "0",
// 			"default?": true,
// 			"photos": [
//   			{
// 					"thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg", **img**
// 					"url": "urlplaceholder/style_1_photo_number.jpg"
// 				},
//   			{
// 					"thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
// 					"url": "urlplaceholder/style_1_photo_number.jpg"
// 				}
//   			// ...
// 			],
// 		"skus": {
//
// 	}
// }