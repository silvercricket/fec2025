import {createSlice} from '@reduxjs/toolkit';

const QuestionsSlice = createSlice({
  name: "QuestionsData",
  initialState: [],
  reducers: {
    setQuestions: (state, action) => {
      return action.payload;
    },
    addQuestions: (state, action) => {
      const updatedQuestions = [...state.questions, action.payload];
      return updatedQuestions;
    }
  }
})

export default QuestionsSlice;
export const QuestionsActions = QuestionsSlice.actions;