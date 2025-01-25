import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import RelatedSlice from './RelatedSlice.js';
import QASlice from './QASlice.js';
const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    QA: QASlice.reducer,

    Related: RelatedSlice.reducer
  }
})

export default STORE;