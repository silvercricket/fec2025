import React, {useState, useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import GalleryAltElement from './GalleryAltElement.jsx';

import {GalleryActions} from '../../../store/GallerySlice.js';

const Gallery = () => {
  const GalleryData = useSelector(store => store.GalleryData);
  const GallerySelection = useSelector(store => store.GallerySelection);
  const [arrows, activateArrows] = useState([null,null]);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [galleryDisplay, setGalleryDisplay] = useState(0);
  const maxLength = 3;



  useEffect(() => {
    if(GalleryData.Gallery.photos !== undefined){
      if(GalleryData.Gallery.photos.length > maxLength){
        activateArrows([
          <button type="button" key="GalleryLeftArrow" style={{float: 'left'}} onClick={()=>{
            console.log(galleryDisplay);
            if(galleryDisplay>0){

              setGalleryDisplay(galleryDisplay - 1);
            }
          }}>
            &larr;
          </button>,
          <button type="button" key="GalleryRightArrow" onClick={()=>{
            if(galleryDisplay<(GalleryData.Gallery.photos.length - maxLength)){
              setGalleryDisplay(galleryDisplay + 1);
            }
          }}>
            &rarr;
          </button>
        ]);
      }
    }
  },[GalleryData, galleryDisplay]);



  if(GalleryData.Gallery.photos !== undefined){
    return(
      <div>
        <div id='galleryAlt'>
          {arrows[0]}
          {GalleryData.Gallery.photos.map((pic, index)=>{
            if(index >= galleryDisplay && index < galleryDisplay+maxLength){

            return (
            <GalleryAltElement image={pic.thumbnail_url} index={index} setDisplayedIndex={setDisplayedIndex} key={index}/>
          );}})}

          {arrows[1]}

        </div>
      </div>
    );
  }
}



export default Gallery;