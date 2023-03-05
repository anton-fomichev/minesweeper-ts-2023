import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTime } from '../../store/toolkitReducer';
import { GameStatus } from '../../types/types';
import { Display } from '../Display/Display';

export const StopWatch = (): JSX.Element => {
  const time = useSelector((state: RootState) => state.game.time);
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameStatus === GameStatus.running) {
        dispatch(addTime());
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time, gameStatus]);

  return <Display value={time} />;
};
