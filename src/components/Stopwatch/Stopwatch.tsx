import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTime } from '../../store/toolkitReducer';
import { Display } from '../Display/Display';

export const StopWatch = (): JSX.Element => {
  const time = useSelector((state: RootState) => state.game.time);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(addTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return <Display value={time} />;
};
