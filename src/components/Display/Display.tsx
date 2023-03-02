import styles from './styles.module.scss';
import classnames from 'classnames';

export const Display = (): JSX.Element => {
  const secs = Number(Math.floor(Math.random() * 40 + 1))
    .toString()
    .padStart(3, '0');
  return (
    <div className={styles.display}>
      <span
        className={classnames(
          styles[`display-${secs[0]}`],
          styles['display__unit'],
        )}
      >
        <span className='visually-hidden'>{secs[0]}</span>
      </span>
      <span
        className={classnames(
          styles[`display-${secs[1]}`],
          styles.display__unit,
        )}
      >
        <span className='visually-hidden'>{secs[1]}</span>
      </span>
      <span
        className={classnames(
          styles[`display-${secs[2]}`],
          styles.display__unit,
        )}
      >
        <span className='visually-hidden'>{secs[2]}</span>
      </span>
    </div>
  );
};
