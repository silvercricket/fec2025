import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({

  name: "Product",
  initialState: {},
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
  }
});

export default ProductSlice;
export const ProductActions = ProductSlice.actions;