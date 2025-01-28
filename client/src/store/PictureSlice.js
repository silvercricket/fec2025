import {createSlice} from '@reduxjs/toolkit';

const PictureSlice = createSlice({
  name: "Picture",
  initialState: {
    Picture: null,

  },



  reducers: {
    setPicture: (state, action) => {
      state.Picture = action.payload;
    }
  }


});


export default PictureSlice;
export const PictureActions = PictureSlice.actions;
