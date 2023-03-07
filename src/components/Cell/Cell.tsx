import {
  CellEntity,
  CellStatus,
  CellType,
  GameStatus,
} from '../../types/types';

import styles from './styles.module.scss';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  endGame,
  pressCell,
  runGame,
  switchFlags,
} from '../../store/toolkitReducer';
import { RootState } from '../../store';

type CellProps = {
  cell: CellEntity;
};

const MOUSE_RIGHT = 2;
const MOUSE_LEFT = 1;

const getClassName = (
  type: CellType,
  status: CellStatus,
  neighbours: number,
  isPressed: boolean,
): string =>
  classnames({
    [styles[`cell-${neighbours}`]]:
      (type as CellType) !== CellType.bomb && neighbours !== 0,
    [styles.cell]: true,
    [styles[status]]: true,
    [styles.active]: isPressed,
    [styles.bomb]:
      (type as CellType) === CellType.bomb &&
      !(status === CellStatus.flagged || status === CellStatus.questioned),
  });

/**
 * A component containing logic and view for cell element of minesweeper game.
 * @param props - {`cell` - cell data }
 * @returns Cell component
 */
export const Cell = ({ cell }: CellProps): JSX.Element => {
  const { neighbours, type, status } = cell;
  const [isPressed, setPressed] = useState(false);
  const className = getClassName(type, status, neighbours, isPressed);
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const isDisabled =
    gameStatus === GameStatus.exploded || gameStatus === GameStatus.won;
  const dispatch = useDispatch();

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  const unpressCell = () => setPressed(false);

  const handlePress = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      if (
        (status === CellStatus.unchecked &&
          (evt.buttons === MOUSE_LEFT || evt.buttons === MOUSE_RIGHT)) ||
        (status === CellStatus.questioned && evt.buttons === MOUSE_RIGHT)
      ) {
        setPressed(true);
      }
    }
  };

  const handleMouseOver = (evt: React.MouseEvent<HTMLButtonElement>) =>
    handlePress(evt);

  const handleMouseDown = (evt: React.MouseEvent<HTMLButtonElement>) =>
    handlePress(evt);

  const handleMouseUp = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      if (evt.button !== MOUSE_RIGHT) {
        if (status === CellStatus.unchecked) {
          if (type === CellType.bomb) {
            dispatch(endGame(cell));
          } else {
            dispatch(runGame());
            dispatch(pressCell(cell));
          }
        }
      } else {
        dispatch(switchFlags(cell));
      }
    }
    unpressCell();
  };

  const handleContextMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  return (
    <button
      className={className}
      type='button'
      onClick={handleClick}
      onMouseLeave={unpressCell}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onDrag={() => false}
      onDragStart={() => false}
      draggable={false}
      disabled={
        gameStatus === GameStatus.exploded || gameStatus === GameStatus.won
      }
    >
      <span className='visually-hidden'>{status}</span>
    </button>
  );
};
