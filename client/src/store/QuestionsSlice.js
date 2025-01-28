import {createSlice} from '@reduxjs/toolkit';

const QuestionsSlice = createSlice({
  name: "QuestionsData",
  initialState: [],
  reducers: {
    setQuestions: (state, action) => {
      return action.payload;
    }
  }
})

export default QuestionsSlice;
export const QuestionsActions = QuestionsSlice.actions;