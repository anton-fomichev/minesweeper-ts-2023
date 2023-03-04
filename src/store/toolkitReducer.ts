import { createAction, createReducer } from '@reduxjs/toolkit';
import { initializeGameState } from '../game';
import { GameStatus } from '../types/types';

const initialState = initializeGameState();

export const addTime = createAction('ADD_TIME');
export const restart = createAction('RESTART');

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addTime, (state) => {
      if (state.status === GameStatus.running) {
        state.time++;
      }
    })
    .addCase(restart, () => initializeGameState())
})