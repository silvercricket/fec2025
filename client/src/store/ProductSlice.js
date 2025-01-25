import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({

  name: "Product",
  initialState: {
    product: {product: {}}
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    }
  }
})

export default ProductSlice;
export const ProductActions = ProductSlice.actions;