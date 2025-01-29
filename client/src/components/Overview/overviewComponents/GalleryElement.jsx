import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import {GalleryActions} from '../../../store/GallerySlice.js';
import {PictureActions} from '../../../store/PictureSlice.js';
const GalleryElement = ({image, index}) => {
  const GalleryData = useSelector(store => store.GalleryData);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(GalleryData);
    if(GalleryData.Gallery.length !== undefined){
      // console.log('riiiiiight here:');
      // console.log(image);
      // console.log('gallery below');
      // console.log(GalleryData.Gallery[1].url);

    }
  },[GalleryData]);
  return(
    <div>
      <img className='galleryPicture' onClick={()=>{
        console.log(GalleryData.Gallery.photos[index].url);
        dispatch(PictureActions.setPicture(GalleryData.Gallery.photos[index].url));

      }} src={image}/>
    </div>
);
}

export default GalleryElement;