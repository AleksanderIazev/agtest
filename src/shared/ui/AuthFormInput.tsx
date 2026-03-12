import * as React from 'react';
import { PersonIcon, LockIcon, ClearIcon, VisibilityIcon, VisibilityOffIcon } from './icons';
import styles from './InputField.module.scss';

type AuthFormInputVariant = 'login' | 'password';

interface AuthFormInputProps {
  variant: AuthFormInputVariant;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const INPUT_CONFIG = {
  login: {
    label: 'Логин',
    placeholder: 'Введите логин',
    iconStart: PersonIcon,
    inputId: 'input-login',
    inputType: 'text' as const,
  },
  password: {
    label: 'Пароль',
    placeholder: 'Введите пароль',
    iconStart: LockIcon,
    inputId: 'input-password',
    inputType: 'password' as const,
  },
} as const;

export const AuthFormInput = ({
  variant,
  value = '',
  onChange,
  onBlur,
  error,
}: AuthFormInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const config = INPUT_CONFIG[variant];
  const IconStart = config.iconStart;

  const isPassword = variant === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : config.inputType;

  const handleTogglePassword = () => setShowPassword((show) => !show);
  const handleClickClear = () =>
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={config.inputId} className={styles.label}>
        {config.label}
      </label>
      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        <span className={styles.iconStart}>
          <IconStart />
        </span>
        <input
          id={config.inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.input}
          placeholder={config.placeholder}
          autoComplete="off"
        />
        <button
          type="button"
          className={styles.iconEnd}
          onClick={isPassword ? handleTogglePassword : handleClickClear}
          onMouseDown={isPassword ? (e) => e.preventDefault() : undefined}
          aria-label={
            isPassword ? (showPassword ? 'Скрыть пароль' : 'Показать пароль') : 'Очистить'
          }
        >
          {isPassword ? showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> : <ClearIcon />}
        </button>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
