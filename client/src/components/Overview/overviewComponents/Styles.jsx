import React, { useEffect}  from 'react';

import { useSelector} from 'react-redux';


import StylesElement from './StylesElement.jsx';



const Styles = () => {
  const StylesData = useSelector(store => store.StylesData);
  const GalleryData = useSelector(store => store.GalleryData);
  var Style = GalleryData.Gallery.name || 'none';
  useEffect(() => {
    Style = GalleryData.name;
  },[StylesData]);

  if(GalleryData.Gallery.name !== undefined){

    return(
      <>
      <h3>style: { Style}</h3>
      <div style={{
        display: 'grid',
        gridGap: '20px',
        justifyContent: 'left',
        gridTemplateColumns: 'repeat(3, calc(8.33% - 20px))'
        }}>


        {StylesData.Styles.map((style, index)=>(

          <StylesElement  style={style} index={index} key={'style ' + index} id={'style' + index}/>
        ))
        }

      </div>
      </>
    );
  }
}

export default Styles;