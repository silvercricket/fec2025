import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: "Product",
  intialState: {},
  reducers: {
    setProduct: (state, action) => {}
  }
})

export default ProductSlice;
export const ProductActions = ProductActions.actions;