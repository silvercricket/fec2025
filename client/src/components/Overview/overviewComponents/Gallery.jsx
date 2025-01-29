import React, {useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import GalleryElement from './GalleryElement.jsx';

import {GalleryActions} from '../../../store/GallerySlice.js';

const Gallery = () => {
  const GalleryData = useSelector(store => store.GalleryData);


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