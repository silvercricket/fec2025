import React, {useState, useEffect}  from 'react';

import {useSelector} from 'react-redux';

import GalleryElement from './GalleryElement.jsx';

const Gallery = () => {
  const GalleryData = useSelector(store => store.GalleryData);
  const [GallerySelection, GallerySelectionSet] = useState(0);
  const [arrows, activateArrows] = useState([null,null]);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const maxLength = 5

  useEffect(() => {
    if(GalleryData.Gallery.photos !== undefined){
      if(displayedIndex> GalleryData.Gallery.photos.length){
        setDisplayedIndex(0);
      }
      if(GalleryData.Gallery.photos.length > maxLength){
        activateArrows([
          <button type="button" key="GalleryUpArrow" data-testid="GalleryUpArrow" onClick={()=>{

            if(GallerySelection>0){

              GallerySelectionSet(GallerySelection - 1);
            }
          }}>
            &uarr;
          </button>,
          <button type="button" key="GalleryDownArrow" data-testid="GalleryDownArrow" onClick={()=>{

            if(GallerySelection<(GalleryData.Gallery.photos.length - maxLength)){

              GallerySelectionSet(GallerySelection + 1);
            }
          }}>
            &darr;
          </button>
        ]);
      }
    }
  },[GalleryData, GallerySelection]);

  if(GalleryData.Gallery.photos !== undefined){

    return(
      <div id='gallery'>
        {arrows[0]}
        {GalleryData.Gallery.photos.map((pic, index)=>{
          if(index >= GallerySelection && index < GallerySelection+maxLength){


          return (
          <GalleryElement image={pic.thumbnail_url} index={index} setDisplayedIndex={setDisplayedIndex} target={displayedIndex} setTarget={setDisplayedIndex} key={index}/>
        );}})}
        {arrows[1]}

      </div>
    );
  } else {
    return null;
  }
}



export default Gallery;