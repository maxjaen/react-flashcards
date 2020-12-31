import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from '../features/flashcards/flashcardsSlice';


export default configureStore({
  reducer: {
    flashcards : flashcardsReducer
  },
});
