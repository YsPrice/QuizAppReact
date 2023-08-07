// questionsSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  answers:[],
    questions: {
        results:[]
    },
    currentQuestionIndex:0,
    loading:false,
    error:null
  }
const questionsSlice = createSlice({
    initialState,
  name: 'questions',
 
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
   
    nextQuestion: (state) => {

            state.currentQuestionIndex +=1;
        
    },
    setAnswer: (state, action) => {
        state.answers.push(action.payload);
      },
      resetQuiz: (state) => {
        // Reset the quiz state to initial values
        state.answers = [];
        state.currentQuestionIndex = 0;
      }
  
  },
});

export const { setQuestions, nextQuestion, setAnswer, resetQuiz } = questionsSlice.actions;
export default questionsSlice.reducer;
