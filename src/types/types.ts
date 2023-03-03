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
  status: CellStatus,
  type: CellType
}
