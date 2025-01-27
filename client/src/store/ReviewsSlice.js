import {createSlice} from '@reduxjs/toolkit';

const ReviewsSlice = createSlice({
  name: "Reviews",
  initialState: {
    Reviews: {
      init: [],
    },
    Meta: {
      data: null,
    },
  },
  reducers: {
    setReviews: (state, action) => {
      state.Reviews = action.payload;
    },
    setMeta: (state, action) => {
      state.Meta = action.payload;
    }
  }
});

export default ReviewsSlice;
export const ReviewsActions = ReviewsSlice.actions;