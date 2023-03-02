import { Board } from '../Board/Board';
import styles from './styles.module.scss';
import '../../styles/defaults.scss';
import 'reset-css';

export const App = (): JSX.Element => (
  <main className={styles['app-main']}>
    <Board></Board>
  </main>
);
