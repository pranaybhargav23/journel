// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './journalSlice';

export const store = configureStore({
  reducer: {
    journal: journalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;