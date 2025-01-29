import React, {useState, useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import axios from 'axios';

const ProductForm = () => {
  const [quantity, setQuantity] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('');
  const [notify, setNotify] = useState('\n');

  const [inStock, setInStock] =useState(true);
  const [purchase, setPurchase] =useState('');
  const [quantities, setQuantities] = useState([]);
  const GalleryData = useSelector(store => store.GalleryData);

  useEffect(() => {
    console.log(GalleryData);

    if(GalleryData.Gallery.name){
      console.log(GalleryData.Gallery.skus);
      // Object.keys(GalleryData.Gallery.skus).map((key) => [GalleryData.Gallery.skus[key]]);
      // var skus = GalleryData.Gallery.skus.forEach((sku)=>{
      //   return sku.size;
      // })
      setSizes([{size:'select size'},...Object.keys(GalleryData.Gallery.skus).map((key) => GalleryData.Gallery.skus[key])]);
      console.log(sizes);
    }
  },[GalleryData]);


  useEffect(() => {
    if(inStock){//pretty sure this won't work for products not actually in stock, but...
      setPurchase(<button type="button" onClick={()=>{
        if(size!=='' && size!=='select size'){
          //add to cart I guess?

          var sku = 0;

          Object.keys(GalleryData.Gallery.skus).map((key) => {
            if(GalleryData.Gallery.skus[key].size === size)
              sku = key;
            })
          //send sku to cart for each quantity (I saw no way to send them en masse).
          console.log(sku);
          for(var i = 0; i < quantity; i++){
            axios.post(process.env.API_URL + '/cart'  ,{sku_id:sku}, {headers: {Authorization:process.env.AUTH_SECRET} })
            .then((res)=>{
              console.log(res.status);
            })
            .catch((err)=>{
              console.log(err);
            })
          }


        } else {
          console.log(size);
          setNotify('please select a size');
        }
      }}>add to cart</button>)
    } else {
      setPurchase('');
    }
  },[size])
  if(GalleryData.Gallery.name !== undefined){
    return(
      <form>
        <p>{notify}</p>
        <select name="sizes" onChange={(e)=>{
          console.log(e.target.value);
          setSize(e.target.value);
          console.log('size set?');
          console.log(size);
          var index = -1;
          for(var i = 0; i < sizes.length; i++) {
            if(sizes[i].size === e.target.value){
              index = i;
            }
          }
          const tempQuantity = sizes[index].quantity;
          var tempQuantities = [];
          for(i = 1; i <= tempQuantity; i++){
            tempQuantities.push(i);
          }
          setQuantities(tempQuantities);
          if(tempQuantity>0){
            setQuantity(1);
            setInStock(true);
          }
          else{
            setInStock(false);
          }
        }} >

          {sizes.map((size)=>(
            <option value={size.size}> {size.size} </option>
          ))}
        </select>

        <select name="quantity"onChange={(e)=>{
          console.log(e.target.value);
          setQuantity(e.target.value);
        }} >
          {quantities.map((amount)=>(
            <option value={amount}> {amount} </option>
          ))}
        </select>
        {purchase}
      </form>
    );
  }
}

export default ProductForm;