import { Field } from '../Field/Field';
import { Header } from '../Header/Header';
import styles from './styles.module.scss';

export const Board = (): JSX.Element => {
  return (
    <div className={styles.board}>
      <Header></Header>
      <Field />
    </div>
  );
};
