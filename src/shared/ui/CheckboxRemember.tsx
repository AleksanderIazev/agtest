import styles from './CheckboxRemember.module.scss';

interface CheckboxRememberProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckboxRemember = ({ checked = false, onChange }: CheckboxRememberProps) => {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.label}>Запомнить данные</span>
    </label>
  );
};
