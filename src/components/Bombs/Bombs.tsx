import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Display } from '../Display/Display';

export const Bombs = (): JSX.Element => {
  const flags = useSelector((state: RootState) => state.game.flags);
  const initialBombs = useSelector(
    (state: RootState) => state.game.options.bombs,
  );
  return <Display value={initialBombs - flags} />;
};
