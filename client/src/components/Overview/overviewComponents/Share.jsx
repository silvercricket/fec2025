import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import {OverviewActions} from '../../../store/OverviewSlice.js';

const Share = () => {

  return(
  <div>
    share on:&nbsp;
    <a href="https://twitter.com/intent/tweet ">Twitter </a>&nbsp;
    <a href=" https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com "> Facebook </a>&nbsp;
    <a href=" https://www.tumblr.com/share">  Tumblr </a>


  </div>
);
}

export default Share;