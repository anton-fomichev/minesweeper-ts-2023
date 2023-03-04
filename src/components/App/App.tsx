import { Board } from '../Board/Board';
import styles from './styles.module.scss';
import '../../styles/defaults.scss';
import 'reset-css';
import { Provider } from 'react-redux';
import { store } from '../../store';

export const App = (): JSX.Element => (
  <Provider store={store}>
    <main className={styles['app-main']}>
      <Board></Board>
    </main>
  </Provider>
);
