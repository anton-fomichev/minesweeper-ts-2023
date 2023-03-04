import { useState } from 'react';
import { FaceState } from '../../types/types';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { restart } from '../../store/toolkitReducer';
import { useDispatch } from 'react-redux';

export const Face = (): JSX.Element => {
  const [state, setState] = useState(FaceState.default);
  const dispatch = useDispatch();
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(restart());
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
