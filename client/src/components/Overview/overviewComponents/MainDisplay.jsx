import React, {useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import {OverviewActions} from '../../../store/OverviewSlice.js';

const MainDisplay = () => {
  const Product = useSelector(store => store.Product);
  // const OverviewData = useSelector(store => store.Overview);
  const PictureData = useSelector(store => store.PictureData);


  useEffect(() => {
    if(PictureData){
      // console.log(PictureData);

    }
  },[PictureData]);
  return(


    <img id='mainDisplay'   src={PictureData.Picture}/>

);
}

export default MainDisplay;