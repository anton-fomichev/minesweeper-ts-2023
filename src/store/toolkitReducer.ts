import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { autoRevealCells, initializeGameState, updateRevealedCells } from '../game';
import { CellEntity, CellStatus, CellType, GameStatus } from '../types/types';

const initialState = initializeGameState();

export const addTime = createAction('ADD_TIME');
export const restart = createAction('RESTART');
export const runGame = createAction('RUN_GAME');
export const endGame = createAction<CellEntity>('END_GAME');
export const pressCell = createAction<CellEntity>('PRESS_CELL');
export const switchFlags = createAction<CellEntity>('SET_FLAG');

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addTime, (state) => {
      if (state.status === GameStatus.running) {
        state.time++;
      }
    })
    .addCase(restart, () => initializeGameState())
    .addCase(runGame, (state) => { state.status = GameStatus.running })
    .addCase(endGame, (state, action: PayloadAction<CellEntity>) => {
      state.status = GameStatus.exploded;
      const cell = action.payload;
      const field = state.field;
      for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
          const currentCell = field[i][j];
          if (currentCell.id === cell.id) {
            currentCell.status = CellStatus.exploded;
          }
          else {
            if (currentCell.type === CellType.empty && currentCell.status === CellStatus.flagged) {
              currentCell.status = CellStatus.missflagged;
            }
            else if (currentCell.status === CellStatus.unchecked || currentCell.status === CellStatus.questioned) {
              currentCell.status = CellStatus.checked;
            }
          }
        }
      }
    })
    .addCase(pressCell, (state, action) => {
      const cell: CellEntity = action.payload;
      let field = state.field;
      for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
          if (field[i][j].id === cell.id) {
            field[i][j].status = CellStatus.checked;
            field = autoRevealCells(field, { y: i, x: j });
          }
        }
      }
      updateRevealedCells(state);
    })
    .addCase(switchFlags, (state, action) => {
      const cell: CellEntity = action.payload;
      const field = state.field;
      const newStatusByStatus = {
        [CellStatus.unchecked]: CellStatus.flagged,
        [CellStatus.flagged]: CellStatus.questioned,
        [CellStatus.questioned]: CellStatus.unchecked,
        [CellStatus.exploded]: CellStatus.exploded,
        [CellStatus.checked]: CellStatus.checked,
        [CellStatus.missflagged]: CellStatus.missflagged
      }
      for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
          if (field[i][j].id === cell.id) {
            switch (field[i][j].status) {
              case CellStatus.unchecked:
                state.flags++;
                break;
              case CellStatus.flagged:
                state.flags--;
                break;
              default: break;
            }
            field[i][j].status = newStatusByStatus[cell.status];
          }
        }
      }
      updateRevealedCells(state);
    })
})