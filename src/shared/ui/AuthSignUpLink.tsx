import styles from './NoAccountLink.module.scss';

export const AuthSignUpLink = () => {
  return (
    <p className={styles.wrapper}>
      Нет аккаунта?{' '}
      <a href="#" className={styles.link}>
        Создать
      </a>
    </p>
  );
};
