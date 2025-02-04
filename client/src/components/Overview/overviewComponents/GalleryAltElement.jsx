import React, {useState, useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import {GalleryActions} from '../../../store/GallerySlice.js';
import {PictureActions} from '../../../store/PictureSlice.js';

import {GallerySelectionActions} from '../../../store/GallerySelectionSlice.js';

import PropTypes from 'prop-types';
const GalleryAltElement = ({image, index, setDisplayedIndex}) => {
  const GalleryData = useSelector(store => store.GalleryData);
  const GallerySelection = useSelector(store => store.GallerySelection);
  const [picIndex,setPicIndex] = useState(index);
  const dispatch = useDispatch();


     useEffect(() => {

      if(GallerySelection.GallerySelection===index){
        setPicIndex('✔');
      } else {
        setPicIndex(index);
      }
     },[GallerySelection])
  if(typeof image === 'string' && (typeof index === 'number' || index === '✔')){
    return(
      <>
        <div data-testid="galleryAltPicture" className='galleryAltPicture'
        onClick={()=>{

          setDisplayedIndex(index);
          dispatch(GallerySelectionActions.setGallerySelection(index));
          dispatch(PictureActions.setPicture(GalleryData.Gallery.photos[index].url));

        }}
        style={{
          float: 'left',
          height: '20px',
          width: '15px',
          background: 'white',
          border: "2px solid #000",
          borderRadius: "10px",
          position: 'relative'
        }}
        >

&nbsp;{picIndex}
        </div>
      </>
    );
  } else {
    return(
      <>
        <img data-testid="galleryPicturePlaceholder" src={'https://dotesports.com/wp-content/uploads/2022/06/17141613/poggers.png'}/>
      </>
    );
  }
}


GalleryAltElement.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default GalleryAltElement;