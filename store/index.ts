import { configureStore } from '@reduxjs/toolkit';
import { dashboardReducer } from './dashboardSlice';
import localStorageMiddleware from './localStorageMiddleware';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;