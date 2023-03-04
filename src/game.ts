import { CellEntity, CellType, GameState, GameStatus } from './types/types';
import { getRandomInt } from './utils';

type BombsCoord = { x: number, y: number };

export const OPTIONS = {
  size: 16,
  bombs: 40
}

const defaultCell: CellEntity = {
  type: CellType.empty,
  neighbours: 0
};

const defaultBomb: CellEntity = {
  type: CellType.bomb,
  neighbours: 0
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
  // Shifts for neighbours
  const dy = [1, 1, 1, 0, 0, -1, -1, -1];
  const dx = [-1, 0, 1, -1, 1, -1, 0, 1];

  const field: CellEntity[][] = [];
  for (let i = 0; i < fieldSize + 2; i++) {
    field.push([...Array(fieldSize + 2)].map(() => ({ ...defaultCell })));
  }
  bombs.forEach(({ x, y }) => {
    for (let k = 0; k < dy.length; k++) {
      field[y + dy[k]][x + dx[k]].neighbours++;
    }
  });
  bombs.forEach(({ x, y }) => {
    field[y][x] = { ...defaultBomb };
  });

  return field.slice(1, field.length - 1).map(row => row.slice(1, row.length - 1));
}

export const initializeGameState = (): GameState => {
  const initialState = {
    field: generateField(generateBombs()),
    status: GameStatus.running,
    options: OPTIONS,
    time: 0,
    flags: 0,
    bombsRevealed: 0
  };

  return initialState;
}
