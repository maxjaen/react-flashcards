import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import flashcardsReducer from '../features/flashcards/flashcardsSlice';


export default configureStore({
  reducer: {
    counter: counterReducer,
    flashcards : flashcardsReducer
  },
});
