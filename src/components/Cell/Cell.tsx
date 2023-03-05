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
  controlFlags,
} from '../../store/toolkitReducer';
import { RootState } from '../../store';

type CellProps = {
  cell: CellEntity;
};

export const Cell = ({ cell }: CellProps): JSX.Element => {
  const { neighbours, type, status } = cell;
  const [isPressed, setPressed] = useState(false);
  const cellClassname = classnames({
    [styles[`cell-${neighbours}`]]: (type as CellType) !== CellType.bomb,
    [styles.cell]: true,
    [styles[status]]: true,
    [styles.active]: isPressed,
    [styles.bomb]:
      (type as CellType) === CellType.bomb &&
      !(status === CellStatus.flagged || status === CellStatus.questioned),
  });

  const gameStatus = useSelector((state: RootState) => state.game.status);
  const isFocused = useSelector((state: RootState) => state.game.focused);
  const dispatch = useDispatch();

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  const unpressCell = () => setPressed(false);

  const handleMouseOver = () => {
    if (isFocused && status === CellStatus.unchecked) setPressed(true);
  };
  const handleMouseDown = () => {
    if (status !== CellStatus.flagged) setPressed(true);
  };

  const handleMouseUp = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (evt.button !== 2) {
      if (status === CellStatus.unchecked) {
        if (type === CellType.bomb) {
          dispatch(endGame(cell));
        } else {
          dispatch(runGame());
          dispatch(pressCell(cell));
        }
      }
    }
    unpressCell();
  };

  const handleContextMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(controlFlags(cell));
  };

  return (
    <button
      className={cellClassname}
      type='button'
      onClick={handleClick}
      onMouseLeave={unpressCell}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      disabled={gameStatus === GameStatus.exploded}
    >
      <span className='visually-hidden'></span>
    </button>
  );
};
