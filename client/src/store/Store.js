import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import RelatedSlice from './RelatedSlice.js';

const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    Related: RelatedSlice.reducer
  }
})

export default STORE;