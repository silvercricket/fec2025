import {createSlice} from '@reduxjs/toolkit';

const QASlice = createSlice({
  name: "QA",
  initialState: {
    questions: []
  },
  reducers: {
    setQuestions: (state, action) => {
      console.log(action.payload)
      state.questions = action.payload;
    },
    addQuestions: (state, action) => {
      state.questions = state.questions.concat([action.payload]);
    }
  }
})

export default QASlice;
export const QAActions = QASlice.actions;