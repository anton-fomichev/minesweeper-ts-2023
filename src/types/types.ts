// Face
export const enum FaceState {
  default = 'default',
  active = 'active',
  clicked = 'clicked',
  won = 'won',
  lost = 'lost',
}

// Cell
export const enum CellStatus {
  unchecked = 'unchecked',
  checked = 'checked',
  flagged = 'flagged',
  exploded = 'exploded',
  questioned = 'questioned',
  missflagged = 'missflagged'
}

export const enum CellType {
  bomb = 'bomb',
  empty = 'empty',
}

export type CellEntity = {
  neighbours: number,
  type: CellType
}

// Game
export const enum GameStatus {
  stopped = 'stopped',
  running = 'running'
}

export type GameState = {
  field: CellEntity[][],
  status: GameStatus,
  options: {
    size: number,
    bombs: number
  }
  time: number,
  flags: number,
  bombsRevealed: number
}
