import {createSlice} from '@reduxjs/toolkit';

const ReviewSlice = createSlice({
  name: "Review",
  initialState: {
    Review: {},
  },
  reducers: {
    setCurrReview: (state, action) => {
      state.Review = action.payload;
    },
  }
});

export default ReviewSlice;
export const ReviewActions = ReviewSlice.actions;