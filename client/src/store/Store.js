import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import OverviewSlice from './OverviewSlice.js';
import RelatedSlice from './RelatedSlice.js';
import QASlice from './QASlice.js';
import ReviewsSlice from './ReviewsSlice.js';

const STORE = configureStore({
  reducer: {
    ReviewsData: ReviewsSlice.reducer,
    Product: ProductSlice.reducer,
    Related: RelatedSlice.reducer,
    Overview: OverviewSlice.reducer,
    QA: QASlice.reducer
  }
})

export default STORE;