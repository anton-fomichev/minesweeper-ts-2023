import { useRef } from 'react';
import { Bombs } from '../Bombs/Bombs';
import { Face } from '../Face/Face';
import { Field } from '../Field/Field';
import { Header } from '../Header/Header';
import { StopWatch } from '../Stopwatch/Stopwatch';
import styles from './styles.module.scss';

/**
 * A parent component containing the minesweeper interface components.
 *
 * @returns Board component
 */
export const Board = (): JSX.Element => {
  const fieldRef = useRef<HTMLDivElement>(null); // accessing HTMLDivElement of field

  return (
    <div className={styles.board}>
      <Header>
        <Bombs />
        <Face focusingElRef={fieldRef} />
        <StopWatch />
      </Header>
      <Field ref={fieldRef} />
    </div>
  );
};
