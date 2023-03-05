import { nanoid } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { CellEntity, CellStatus, CellType, GameState, GameStatus } from './types/types';
import { getRandomInt } from './utils';

type BombsCoord = { x: number, y: number };

export const OPTIONS = {
  size: 16,
  bombs: 40
}

// Shifts for neighbours
const SHIFTS = {
  dy: [1, 1, 1, 0, 0, -1, -1, -1],
  dx: [-1, 0, 1, -1, 1, -1, 0, 1]
}

const defaultCell: CellEntity = {
  type: CellType.empty,
  neighbours: 0,
  status: CellStatus.unchecked,
  id: 'id'
};

const defaultBomb: CellEntity = {
  type: CellType.bomb,
  neighbours: 0,
  status: CellStatus.unchecked,
  id: 'id'
}

const generateBombs = (size: number = OPTIONS.size, count: number = OPTIONS.bombs): BombsCoord[] => {
  const coordPairs: BombsCoord[] = [];
  for (let i = 1; i < size + 1; i++) {
    for (let j = 1; j < size + 1; j++) {
      coordPairs.push({ x: i, y: j });
    }
  }

  const bombs: BombsCoord[] = [];
  const indexes = new Set<number>();
  while (indexes.size !== count) {
    const index = getRandomInt(0, coordPairs.length);
    if (!indexes.has(index)) {
      indexes.add(index);
      bombs.push(coordPairs[index]);
      coordPairs.splice(index, 1);
    }
  }
  return bombs;
}

const generateField = (bombs: BombsCoord[], fieldSize: number = OPTIONS.size): CellEntity[][] => {
  const { dy, dx } = SHIFTS;
  const field: CellEntity[][] = [];
  for (let i = 0; i < fieldSize + 2; i++) {
    field.push([...Array(fieldSize + 2)].map(() => ({ ...defaultCell, id: nanoid() })));
  }
  bombs.forEach(({ x, y }) => {
    for (let k = 0; k < dy.length; k++) {
      field[y + dy[k]][x + dx[k]].neighbours++;
    }
  });
  bombs.forEach(({ x, y }) => {
    field[y][x] = { ...defaultBomb, id: nanoid() };
  });

  return field;
}

export const initializeGameState = (): GameState => {
  const initialState = {
    field: generateField(generateBombs()),
    status: GameStatus.stopped,
    options: OPTIONS,
    time: 0,
    flags: 0,
    cellsRevealed: 0,
    focused: false
  };

  return initialState;
}

export const autoRevealCells = (field: CellEntity[][], cellCoords: { x: number, y: number }): CellEntity[][] => {
  const { dy, dx } = SHIFTS;
  const { x, y } = cellCoords;
  const curCell = field[y][x];
  if ((x > 0 && x < field.length - 1) && (y > 0 && y < field.length - 1)) {
    for (let k = 0; k < dy.length; k++) {
      const neighbour = field[y + dy[k]][x + dx[k]];
      if (neighbour.type === CellType.bomb || neighbour.status === CellStatus.checked) continue;
      if (curCell.neighbours === 0) {
        neighbour.status = CellStatus.checked;
        autoRevealCells(field, { y: y + dy[k], x: x + dx[k] });
      }
      else {
        if (neighbour.neighbours === 0) {
          neighbour.status = CellStatus.checked;
          autoRevealCells(field, { y: y + dy[k], x: x + dx[k] })
        }
      }
    }
  }

  return field;
};

export const updateRevealedCells = (state: WritableDraft<GameState>) => {
  let revealed = 0;
  const field = state.field;
  for (let i = 1; i < field.length - 1; i++) {
    for (let j = 1; j < field.length - 1; j++) {
      if (field[i][j].status === CellStatus.checked) {
        revealed++;
      }
    }
  }
  state.cellsRevealed = revealed;
  if (revealed === state.options.size * state.options.size - state.options.bombs) {
    state.status = GameStatus.won;
    for (let i = 1; i < field.length - 1; i++) {
      for (let j = 1; j < field.length - 1; j++) {
        if (field[i][j].type === CellType.bomb) {
          field[i][j].status = CellStatus.flagged;
        }
      }
    }
  }
}