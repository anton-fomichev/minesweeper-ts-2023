import { FaceState, GameStatus } from '../../types/types';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { restart } from '../../store/toolkitReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

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

export const Face = (): JSX.Element => {
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const isFocused = useSelector((state: RootState) => state.game.focused);
  const faceState = getFaceStateByGameStatus(gameStatus);
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
