import {createSlice} from '@reduxjs/toolkit';

const RelatedSlice = createSlice({
  name: "Related",
  initialState: [],
  reducers: {
    setRelated: (state, action) => {
      return action.payload;
    },
  }
})

export default RelatedSlice;
export const RelatedActions = RelatedSlice.actions;