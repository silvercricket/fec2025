import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import ReviewsSlice from './ReviewsSlice.js';

const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    Reviews: ReviewsSlice.reducer,
  }
})

export default STORE;