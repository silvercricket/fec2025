


import React, {useState, useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import StylesElement from './StylesElement.jsx';

import {StylesActions} from '../../../store/StylesSlice.js';

const StarDisplay = ({score}) => {
  const [stars, setStars] = useState([]);
  // var Style = GalleryData.Gallery.name || 'none';
  useEffect(() => {
    setStars([]);

    var tempStars = []
    for(var i = 0; i < score - 1; i++){
      //setStars([...stars,'https://static-00.iconduck.com/assets.00/star-icon-512x489-3o5omkh5.png']);
      tempStars.push('https://static-00.iconduck.com/assets.00/star-icon-512x489-3o5omkh5.png')
    }
    var remainder = score - i;
    if(remainder>.875){
      //setStars([...stars,'https://static-00.iconduck.com/assets.00/star-icon-512x489-3o5omkh5.png']);
      tempStars.push('https://static-00.iconduck.com/assets.00/star-icon-512x489-3o5omkh5.png');
    } else if(remainder>.625) {
      //setStars([...stars,'https://static-00.iconduck.com/assets.00/star-three-quarter-icon-2048x1963-kugr6vvh.png']);
      tempStars.push('https://static-00.iconduck.com/assets.00/star-three-quarter-icon-2048x1963-kugr6vvh.png');
    } else if (remainder>.375) {
      //setStars([...stars,'https://static-00.iconduck.com/assets.00/star-half-icon-512x490-hk2n5l7b.png'])
      tempStars.push('https://static-00.iconduck.com/assets.00/star-half-icon-512x490-hk2n5l7b.png');
    } else if(remainder> .125){
      //setStars([...stars,'https://static-00.iconduck.com/assets.00/star-one-quarter-icon-512x491-7vr3kq24.png'])
      tempStars.push('https://static-00.iconduck.com/assets.00/star-one-quarter-icon-512x491-7vr3kq24.png');
    }
    i++;
    for(i; i<5; i++){
      tempStars.push('https://static-00.iconduck.com/assets.00/star-empty-icon-2048x1925-1pqyr3uy.png');
    }
    setStars(tempStars);

  },[score]);

    return(
      <>
      <div>


        {stars.map((star, index)=>(
        <img key={index} style={{width:'20px', height:'20px'}} src = {star}/>
        ))}



      </div>
      </>
    );

}

export default StarDisplay;