import { Cell } from '../Cell/Cell';
import styles from './styles.module.scss';
import { OPTIONS } from '../../game';

export const Field = (): JSX.Element => {
  return (
    <div className={styles.field}>
      {Array.from({ length: OPTIONS.size * OPTIONS.size }, (_, i) => (
        <Cell key={i} /> // key={i} is just for testing
      ))}
    </div>
  );
};
