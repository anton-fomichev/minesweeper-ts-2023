import { Cell } from '../Cell/Cell';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CellEntity } from '../../types/types';
import { setFocus } from '../../store/toolkitReducer';

export const Field = (): JSX.Element => {
  const field: CellEntity[][] = useSelector(
    (state: RootState) => state.game.field,
  );
  const dispatch = useDispatch();

  const handleMouseDown = () => dispatch(setFocus(true));
  const handleMouseUp = () => dispatch(setFocus(false));

  return (
    <div
      className={styles.field}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {field
        .slice(1, field.length - 1)
        .map((row) => row.slice(1, row.length - 1))
        .map((row: CellEntity[]) =>
          row.map((cell: CellEntity) => <Cell cell={cell} key={cell.id} />),
        )}
    </div>
  );
};
