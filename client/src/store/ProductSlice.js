import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
<<<<<<< HEAD
    product: {},
=======
    product: {}
>>>>>>> main
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
<<<<<<< HEAD
    },
=======
    }
>>>>>>> main
  }
});

export default ProductSlice;
export const ProductActions = ProductSlice.actions;