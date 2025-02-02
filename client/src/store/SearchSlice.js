import {createSlice} from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: "Search",
  initialState: false,
  reducers: {
    setSearch: (state, action) => {
      return action.payload;
    },
  }
});

export default SearchSlice;
export const SearchActions = SearchSlice.actions;