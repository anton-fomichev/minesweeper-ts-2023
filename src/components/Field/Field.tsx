import { Cell } from '../Cell/Cell';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CellEntity } from '../../types/types';

export const Field = (): JSX.Element => {
  const field: CellEntity[][] = useSelector(
    (state: RootState) => state.game.field,
  );
  return (
    <div className={styles.field}>
      {field.map((row: CellEntity[], y: number) =>
        row.map((cell: CellEntity, x: number) => (
          <Cell cell={cell} key={`${y}-${x}`} />
        )),
      )}
    </div>
  );
};
