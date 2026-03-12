import styles from './AuthDivider.module.scss';

export const AuthDivider = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line} />
      <span className={styles.text}>или</span>
      <div className={styles.line} />
    </div>
  );
};
