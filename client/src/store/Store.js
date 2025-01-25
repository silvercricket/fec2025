import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
// import OverviewSlice from './OverviewSlice.js';
import RelatedSlice from './RelatedSlice.js';
import QASlice from './QASlice.js';

const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    Related: RelatedSlice.reducer,
    // Overview: OverviewSlice.reducer,
    QA: QASlice.reducer
  }
})

export default STORE;