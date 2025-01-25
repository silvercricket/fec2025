import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import QASlice from './QASlice.js';
const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    QA: QASlice.reducer,
  }
})

export default STORE;