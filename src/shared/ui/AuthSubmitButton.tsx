import styles from './ButtonLogin.module.scss';

interface AuthSubmitButtonProps {
  disabled?: boolean;
}

export const AuthSubmitButton = ({ disabled = false }: AuthSubmitButtonProps) => {
  return (
    <button type="submit" className={styles.button} disabled={disabled}>
      Войти
    </button>
  );
};
