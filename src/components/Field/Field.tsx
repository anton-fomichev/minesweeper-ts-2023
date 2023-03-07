import { Cell } from '../Cell/Cell';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CellEntity } from '../../types/types';
import classnames from 'classnames';
import React from 'react';

/**
 * A component containing logic and view for field element in minesweeper game.
 *
 * Field is filled with [Cell](../Cell/Cell.tsx) components.
 * @param _props - component props (never used)
 * @param ref - `forwardRef` for field `HTMLDivElement`
 * @returns Field component
 */
const Field = React.forwardRef<HTMLDivElement>(
  (_props, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const field: CellEntity[][] = useSelector(
      (state: RootState) => state.game.field,
    );

    return (
      <div ref={ref} className={classnames(styles.field)}>
        {field
          .slice(1, field.length - 1)
          .map((row) => row.slice(1, row.length - 1))
          .map((row: CellEntity[]) =>
            row.map((cell: CellEntity) => <Cell cell={cell} key={cell.id} />),
          )}
      </div>
    );
  },
);

Field.displayName = 'Field';
export { Field };
