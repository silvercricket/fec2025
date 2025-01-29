import React, {useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import StylesElement from './StylesElement.jsx';

import {StylesActions} from '../../../store/StylesSlice.js';

const Styles = () => {
  const StylesData = useSelector(store => store.StylesData);
  const GalleryData = useSelector(store => store.GalleryData);
  var Style = GalleryData.Gallery.name || 'none';
  useEffect(() => {
    Style = GalleryData.name;
  },[StylesData]);
  if(GalleryData.Gallery.name !== undefined){
    return(
      <div>
        <h3>style: { Style}</h3>
        {StylesData.Styles.map((style, index)=>(
          <StylesElement  style={style} index={index}/>
        ))
        }

      </div>
    );
  }
}

export default Styles;