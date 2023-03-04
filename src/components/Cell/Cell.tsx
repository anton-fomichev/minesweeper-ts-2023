import { CellEntity, CellStatus, CellType } from '../../types/types';
import styles from './styles.module.scss';
import classnames from 'classnames';

type CellProps = {
  cell: CellEntity;
};

export const Cell = ({ cell }: CellProps): JSX.Element => {
  const { neighbours, type } = cell;
  const isActive = false;
  const status = CellStatus.checked;
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
    <button className={cellClassname} type='button' onClick={handleClick}>
      <span className='visually-hidden'>{neighbours}</span>
    </button>
  );
};
