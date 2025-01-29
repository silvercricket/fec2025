import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';
import {GalleryActions} from '../../../store/GallerySlice.js';
import {StylesActions} from '../../../store/StylesSlice.js';
import {PictureActions} from '../../../store/PictureSlice.js';
const StylesElement = ({style, index}) => {
  const StylesData = useSelector(store => store.StylesData);
  const image = style.photos[0].thumbnail_url;
  const dispatch = useDispatch();
  return(

      <img className='stylePicture' onClick={()=>{
        dispatch(PictureActions.setPicture(StylesData.Styles[index].photos[0].url));
        dispatch(GalleryActions.setGallery(StylesData.Styles[index]));

      }} src={image}/>

);
}

export default StylesElement;