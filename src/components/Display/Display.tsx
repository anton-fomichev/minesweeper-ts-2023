import styles from './styles.module.scss';
import classnames from 'classnames';

type DisplayProps = {
  value: number;
};

export const Display = ({ value }: DisplayProps): JSX.Element => {
  const displayValue = value.toString().padStart(3, '0');
  return (
    <div className={styles.display}>
      <span
        className={classnames(
          styles[`display-${displayValue[0]}`],
          styles['display__unit'],
        )}
      >
        <span className='visually-hidden'>{displayValue[0]}</span>
      </span>
      <span
        className={classnames(
          styles[`display-${displayValue[1]}`],
          styles.display__unit,
        )}
      >
        <span className='visually-hidden'>{displayValue[1]}</span>
      </span>
      <span
        className={classnames(
          styles[`display-${displayValue[2]}`],
          styles.display__unit,
        )}
      >
        <span className='visually-hidden'>{displayValue[2]}</span>
      </span>
    </div>
  );
};
