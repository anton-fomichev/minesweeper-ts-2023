import { Display } from '../Display/Display';
import { Face } from '../Face/Face';
import styles from './styles.module.scss';

export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <Display></Display>
      <Face />
      <Display></Display>
    </div>
  );
};
