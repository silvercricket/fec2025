import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import {GalleryActions} from '../../../store/GallerySlice.js';
import {PictureActions} from '../../../store/PictureSlice.js';

import PropTypes from 'prop-types';
const GalleryElement = ({image, index}) => {
  const GalleryData = useSelector(store => store.GalleryData);
  const dispatch = useDispatch();

  if(typeof image === 'string' && typeof index === 'number'){
    return(
      <div>
        <img data-testid="galleryPicture" className='galleryPicture'  onClick={()=>{
          console.log(GalleryData.Gallery.photos[index].url);
          dispatch(PictureActions.setPicture(GalleryData.Gallery.photos[index].url));

        }} src={image}/>
      </div>
    );
  } else {
    return(
      <div>
        <img data-testid="galleryPicturePlaceholder" src={'https://dotesports.com/wp-content/uploads/2022/06/17141613/poggers.png'}/>
      </div>
    );
  }
}


GalleryElement.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default GalleryElement;