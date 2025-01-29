import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import {OverviewActions} from '../../../store/OverviewSlice.js';

const MainDisplay = () => {
  const Product = useSelector(store => store.Product);
  const PictureData = useSelector(store => store.PictureData);

<<<<<<< HEAD
=======

  useEffect(() => {
    if(PictureData){
      // console.log(PictureData);

    }
  },[PictureData]);
>>>>>>> 6e9a289360e30508b4a4e3336e43df3130f82344
  return(


    <img id='mainDisplay'   src={PictureData.Picture}/>

);
}

export default MainDisplay;