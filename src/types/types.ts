// Face
export const enum FaceState {
  default = 'default',
  active = 'active',
  clicked = 'clicked',
  won = 'won',
  exploded = 'exploded',
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
  type: CellType,
  status: CellStatus,
  id: string
}

// Game
export const enum GameStatus {
  stopped = 'stopped',
  running = 'running',
  exploded = 'exploded',
  won = 'won'
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
  cellsRevealed: number,
  focused: boolean
}
