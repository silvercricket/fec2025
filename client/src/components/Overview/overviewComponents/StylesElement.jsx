import React, {useState, useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';
import {GalleryActions} from '../../../store/GallerySlice.js';
import {StylesActions} from '../../../store/StylesSlice.js';
import {PictureActions} from '../../../store/PictureSlice.js';
import PropTypes from 'prop-types';

const StylesElement = ({style, index}) => {
  const StylesData = useSelector(store => store.StylesData);
  const GalleryData = useSelector(store => store.GalleryData);
  const image = style.photos[0].thumbnail_url;
  const testId= 'stylePicture' + index;
  const [background, setBackground] = useState({
    borderRadius: '100000px',
    width: '60px',
    height: '60px',
  })
  const dispatch = useDispatch();
   useEffect(() => {

    if(GalleryData.Gallery){
    if(GalleryData.Gallery.photos[0].thumbnail_url===image){
      setBackground({

        borderRadius: '100000px',
        width: '60px',
        height: '60px',
        border: "2px solid #000",
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "rgba(50,200,50,1)"
      });
    } else {
      setBackground({
        borderRadius: '100000px',
        width: '60px',
        height: '60px',
      });
    }
   }},[GalleryData])
  return(

      <img className='stylePicture' data-testid = {testId} id={'stylePicture' + index} onClick={()=>{
        dispatch(PictureActions.setPicture(StylesData.Styles[index].photos[0].url));
        dispatch(GalleryActions.setGallery(StylesData.Styles[index]));

      }} src={image} style={background}/>

);
}


StylesElement.propTypes = {
  style: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default StylesElement;