import {createSlice} from '@reduxjs/toolkit';

const ReviewsMetaSlice = createSlice({
  name: "ReviewsMeta",
  initialState: [],
  reducers: {
    setReviewsMeta: (state, action) => {
      return action.payload
    },
  }
});

export default ReviewsMetaSlice;
export const ReviewsMetaActions = ReviewsMetaSlice.actions;