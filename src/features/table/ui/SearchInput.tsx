import React from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Найти',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.searchWrapper}>
      <span className={styles.searchLabel}>Товары</span>
      <div className={styles.searchContainer}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7605 8.86088 17.7605C3.96967 17.7605 0 13.7908 0 8.88024C0 3.96967 3.96967 0 8.88024 0C13.7908 0 17.7605 3.96967 17.7605 8.88024C17.7605 10.8906 17.0407 12.8417 15.7832 14.3911ZM13.8082 13.6605C15.0581 12.3756 15.7555 10.6532 15.7555 8.88024C15.7555 5.08467 12.6758 2.00498 8.88024 2.00498C5.08467 2.00498 2.00498 5.08467 2.00498 8.88024C2.00498 12.6758 5.08467 15.7555 8.88024 15.7555C10.6532 15.7555 12.3756 15.0581 13.6605 13.8082L13.8082 13.6605Z"
            fill="#999999"
          />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
