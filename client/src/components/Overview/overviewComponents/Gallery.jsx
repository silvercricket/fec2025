import React, {useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import GalleryElement from './GalleryElement.jsx';

import {GalleryActions} from '../../../store/GallerySlice.js';

const Gallery = () => {
  const GalleryData = useSelector(store => store.GalleryData);

<<<<<<< HEAD
=======
  useEffect(() => {
    // console.log("pics go here");
    if(true){
      // console.log('riiiiiight here:');
      // console.log(GalleryData);
>>>>>>> 6e9a289360e30508b4a4e3336e43df3130f82344

  if(GalleryData.Gallery.photos !== undefined){
    return(
      <div id='gallery'>
        {GalleryData.Gallery.photos.map((pic, index)=>(
          <GalleryElement  image={pic.thumbnail_url} index={index}/>
        ))
        }

      </div>
    );
  }
}

export default Gallery;