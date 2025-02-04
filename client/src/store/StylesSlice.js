import {createSlice} from '@reduxjs/toolkit';

const StylesSlice = createSlice({
  name: "Styles",
  initialState: {
    Styles: []
  },



  reducers: {
    setStyles: (state, action) => {
      state.Styles = action.payload;
    }
  }


});


export default StylesSlice;
export const StylesActions = StylesSlice.actions;