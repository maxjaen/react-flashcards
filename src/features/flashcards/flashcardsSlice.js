import { createSlice } from '@reduxjs/toolkit';

export const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
        console.log(action);
        state.value = action.payload;
    },
  },
});

export const { update } = flashcardsSlice.actions;
export const selectFlashcards = state => state.flashcards.value;

export default flashcardsSlice.reducer;
