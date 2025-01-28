import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import OverviewSlice from './OverviewSlice.js';
import RelatedSlice from './RelatedSlice.js';
import QuestionsSlice from './QuestionsSlice.js';
import ReviewsSlice from './ReviewsSlice.js';
import GallerySlice from './GallerySlice.js';
import PictureSlice from './PictureSlice.js';

const STORE = configureStore({
  reducer: {
    ReviewsData: ReviewsSlice.reducer,
    Product: ProductSlice.reducer,
    RelatedData: RelatedSlice.reducer,
    OverviewData: OverviewSlice.reducer,
    GalleryData: GallerySlice.reducer,
    PictureData: PictureSlice.reducer,
    QAData: QASlice.reducer,
    QuestionsData: QuestionsSlice.reducer
  }
})

export default STORE;