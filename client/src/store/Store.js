import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice.js';
import OverviewSlice from './OverviewSlice.js';
const STORE = configureStore({
  reducer: {
    Product: ProductSlice.reducer,
    Overview: OverviewSlice.reducer
  }
})

export default STORE;