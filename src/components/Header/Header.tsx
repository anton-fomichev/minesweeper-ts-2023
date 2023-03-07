import { ReactNode } from 'react';
import styles from './styles.module.scss';

type HeaderProps = {
  children?: ReactNode;
};

/**
 * A component containing header interface of minesweeper game.
 *
 * Field is filled with [Cell](../Cell/Cell.tsx) components.
 * @param props - {children : ReactNode objects containing in header ([Bombs](../Bombs/Bombs.tsx), [Face](../Face/Face.tsx), [Stopwatch](../Stopwatch/Stopwatch.tsx))}
 * @returns Header component
 */
export const Header = ({ children }: HeaderProps): JSX.Element => (
  <div className={styles.header}>{children}</div>
);
