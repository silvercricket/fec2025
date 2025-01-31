import React, {useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import GalleryAltElement from './GalleryAltElement.jsx';

import {GalleryActions} from '../../../store/GallerySlice.js';

const Gallery = () => {
  const GalleryData = useSelector(store => store.GalleryData);


  if(GalleryData.Gallery.photos !== undefined){
    return(
      <div id='galleryAlt'>
        {GalleryData.Gallery.photos.map((pic, index)=>(
          <GalleryAltElement image={pic.thumbnail_url} index={index} key={index}/>
        ))
        }

      </div>
    );
  }
}



export default Gallery;