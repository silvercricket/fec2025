import React, {useState, useEffect}  from 'react';

import {useSelector} from 'react-redux';


import GalleryAltElement from './GalleryAltElement.jsx';


const Gallery = () => {
  const GalleryData = useSelector(store => store.GalleryData);

  const [arrows, activateArrows] = useState([null,null]);

  const [galleryDisplay, setGalleryDisplay] = useState(0);
  const maxLength = 3;



  useEffect(() => {
    if(GalleryData.Gallery.photos !== undefined){

      if(GalleryData.Gallery.photos.length > maxLength){
        activateArrows([
          <button type="button" key="GalleryLeftArrow" data-testid="GalleryLeftArrow" style={{float: 'left'}} onClick={()=>{
            if(galleryDisplay>0){

              setGalleryDisplay(galleryDisplay - 1);
            }
          }}>
            &larr;
          </button>,
          <button type="button" key="GalleryRightArrow" data-testid="GalleryRightArrow" onClick={()=>{
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
        <div id='galleryAlt' data-testid="galleryAlt">
          {arrows[0]}
          {GalleryData.Gallery.photos.map((pic, index)=>{
            if(index >= galleryDisplay && index < galleryDisplay+maxLength){

            return (
            <GalleryAltElement image={pic.thumbnail_url} index={index} key={index}/>
          );}})}

          {arrows[1]}

        </div>
      </div>
    );
  }
}



export default Gallery;