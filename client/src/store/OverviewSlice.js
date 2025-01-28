import {createSlice} from '@reduxjs/toolkit';

const OverviewSlice = createSlice({
  name: "Overview",
  initialState: {
    Overview: null
  },



  reducers: {
    setOverview: (state, action) => {
      state.Overview = action.payload;
    }
  }


});




export default OverviewSlice;
export const OverviewActions = OverviewSlice.actions;


