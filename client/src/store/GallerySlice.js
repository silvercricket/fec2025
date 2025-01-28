import {createSlice} from '@reduxjs/toolkit';

const GallerySlice = createSlice({
  name: "Gallery",
  initialState: {
    Gallery: []
  },



  reducers: {
    setGallery: (state, action) => {
      state.Gallery = action.payload;
    }
  }


});


export default GallerySlice;
export const GalleryActions = GallerySlice.actions;
