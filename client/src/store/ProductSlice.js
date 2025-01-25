import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: "product",
  initialState: {product: {}},
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    }
  }
})

export default ProductSlice;
export const ProductActions = ProductSlice.actions;