import React, {useState, useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {PictureActions} from '../../../store/PictureSlice.js';

import {GallerySelectionActions} from '../../../store/GallerySelectionSlice.js';

import PropTypes from 'prop-types';
const GalleryElement = ({image, index}) => {
  const GalleryData = useSelector(store => store.GalleryData);
  const GallerySelection = useSelector(store => store.GallerySelection);
  const dispatch = useDispatch();

  const [style, setStyle] = useState({
    position:'relative',
    width: '22%',
    height: '22%'
  })
   useEffect(() => {
    if(GallerySelection.GallerySelection===index){
      setStyle({
        position:'relative',
        width: '75px',
        height: '100px',
        border: "2px solid #000",
        borderStyle: "solid",
        borderWidth: "5px",
        borderColor: "rgba(50,200,50,1)"
      });
    } else {
      setStyle({
        position:'relative',
        width: '75px',
        height: '100px',
      });
    }
   },[GallerySelection])

  if(typeof image === 'string' && typeof index === 'number' ){

    return(
      <div>
        <img data-testid="galleryPicture" className='galleryPicture' style={style} onClick={()=>{

          dispatch(PictureActions.setPicture(GalleryData.Gallery.photos[index].url));
          dispatch(GallerySelectionActions.setGallerySelection(index));
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
  checkmark: PropTypes.any
};

export default GalleryElement;