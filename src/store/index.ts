import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameReducer from './toolkitReducer';

const rootReducer = combineReducers({
  game: gameReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>