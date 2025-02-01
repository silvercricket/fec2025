import {createSlice} from '@reduxjs/toolkit';

const GallerySelectionSlice = createSlice({
  name: "GallerySelection",
  initialState: {
    GallerySelection: 0
  },



  reducers: {
    setGallerySelection: (state, action) => {
      state.GallerySelection = action.payload;
    }
  }


});


export default GallerySelectionSlice;
export const GallerySelectionActions = GallerySelectionSlice.actions;
