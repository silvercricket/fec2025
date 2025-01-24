import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
  }
})

export default STORE;