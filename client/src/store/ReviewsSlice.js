import {createSlice} from '@reduxjs/toolkit';

const ReviewsSlice = createSlice({
  name: "ReviewsData",
  initialState: {},
  reducers: {
    setReviews: (state, action) => {
      return action.payload;
    },
  }
});

export default ReviewsSlice;
export const ReviewsActions = ReviewsSlice.actions;