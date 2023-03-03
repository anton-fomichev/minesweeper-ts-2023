import { CellStatus, CellType } from '../../types/types';
import { useRef, useState } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

export const Cell = (): JSX.Element => {
  const [status, setStatus] = useState(CellStatus.unchecked);
  const [isActive, setActive] = useState(false);
  const neighbours = Math.floor(Math.random() * 8 + 1);
  const cellEl = useRef<HTMLButtonElement>(null);
  const type = CellType.empty;

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  const cellClassname = classnames({
    [styles[`cell-${neighbours}`]]: (type as CellType) !== CellType.bomb,
    [styles.cell]: true,
    [styles[status]]: true,
    [styles.active]: isActive,
    [styles.bomb]: (type as CellType) === CellType.bomb,
  });
  return (
    <button
      ref={cellEl}
      className={cellClassname}
      type='button'
      onClick={handleClick}
    >
      <span className='visually-hidden'>{neighbours}</span>
    </button>
  );
};
