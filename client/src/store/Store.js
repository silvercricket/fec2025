import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import OverviewSlice from './OverviewSlice.js';
import RelatedSlice from './RelatedSlice.js';
import QuestionsSlice from './QuestionsSlice.js';
import ReviewsSlice from './ReviewsSlice.js';

const STORE = configureStore({
  reducer: {
    ReviewsData: ReviewsSlice.reducer,
    Product: ProductSlice.reducer,
    RelatedData: RelatedSlice.reducer,
    OverviewData: OverviewSlice.reducer,
    QuestionsData: QuestionsSlice.reducer
  }
})

export default STORE;