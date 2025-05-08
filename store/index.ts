import { configureStore } from '@reduxjs/toolkit';
import { dashboardReducer } from './dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;