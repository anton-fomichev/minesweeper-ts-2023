import { Header } from '../Header/Header';
import styles from './styles.module.scss';

export const Board = (): JSX.Element => {
  return (
    <div className={styles.board}>
      <Header></Header>
    </div>
  );
};
