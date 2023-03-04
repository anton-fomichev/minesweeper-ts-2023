import { Bombs } from '../Bombs/Bombs';
import { Face } from '../Face/Face';
import { StopWatch } from '../Stopwatch/Stopwatch';
import styles from './styles.module.scss';

export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <Bombs />
      <Face />
      <StopWatch />
    </div>
  );
};
