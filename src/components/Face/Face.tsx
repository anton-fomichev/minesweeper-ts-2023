import { FaceState, GameStatus } from '../../types/types';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { restart } from '../../store/toolkitReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useFocus } from '../../hooks/useFocus';
import React from 'react';

const getFaceStateByGameStatus = (gameStatus: GameStatus) => {
  switch (gameStatus) {
    case GameStatus.won:
      return FaceState.won;
    case GameStatus.exploded:
      return FaceState.exploded;
    default:
      return FaceState.default;
  }
};

type FaceProps = {
  focusingElRef: React.RefObject<HTMLElement>;
};

/**
 * A component containing logic and view for face element in minesweeper game.
 * @param props - {`focusingElRef` - element face focusing on}
 * @returns Face component
 */
export const Face = ({ focusingElRef }: FaceProps): JSX.Element => {
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const faceState = getFaceStateByGameStatus(gameStatus);
  const isFocused = useFocus(focusingElRef);

  const dispatch = useDispatch();

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(restart());
  };

  const btnClass = classnames({
    btn: true,
    [styles.face]: true,
    [styles[`${faceState}`]]: faceState !== FaceState.default,
    [styles.focused]: isFocused,
  });

  return (
    <button className={btnClass} type='button' onClick={handleClick}>
      <span className='visually-hidden'>Restart</span>
    </button>
  );
};
