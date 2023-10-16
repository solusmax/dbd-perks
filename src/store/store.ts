import { StoreEnhancer, compose, configureStore } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage';

import appReducer from './appSlice';
import perksReducer from './perksSlice';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const localStorageEnhancer: StoreEnhancer = compose(persistState('app'));

export const store = configureStore({
  reducer: {
    app: appReducer,
    perks: perksReducer,
  },
  enhancers: [localStorageEnhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
