import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import OverviewSlice from './OverviewSlice.js';
import RelatedSlice from './RelatedSlice.js';

const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    Related: RelatedSlice.reducer,
    Overview: OverviewSlice.reducer
  }
})

export default STORE;