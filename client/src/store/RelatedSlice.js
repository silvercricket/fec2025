import {createSlice} from '@reduxjs/toolkit';

const RelatedSlice = createSlice({
  name: "Related",
  initialState: {
    related: []
  },
  reducers: {
    setRelated: (state, action) => {
      state.related = action.payload;
    }
  }
})

export default RelatedSlice;
export const RelatedActions = RelatedSlice.actions;