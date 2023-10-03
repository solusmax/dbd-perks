import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlice';
import perksReducer from './perksSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    perks: perksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
