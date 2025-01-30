import {createSlice} from '@reduxjs/toolkit';
// product: {product: {}}
const ProductSlice = createSlice({

  name: "Product",
  initialState: {},
  reducers: {
    setProduct: (state, action) => {
      // state.product = action.payload;
      return action.payload
    },
  }
});

export default ProductSlice;
export const ProductActions = ProductSlice.actions;