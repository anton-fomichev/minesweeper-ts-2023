import { useState } from 'react';
import { FaceState } from '../../types/types';
import classnames from 'classnames';
import styles from './styles.module.scss';

export const Face = (): JSX.Element => {
  const [state, setState] = useState(FaceState.default);

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  const btnClass = classnames({
    btn: true,
    [styles['btn--face']]: true,
    [styles[`face--${state}`]]: state !== FaceState.default,
  });
  return (
    <button className={btnClass} type='button' onClick={handleClick}>
      <span className='visually-hidden'>Restart</span>
    </button>
  );
};
