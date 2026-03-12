import * as React from 'react';
import { SearchInput } from '../../../features/table/ui/SearchInput';
import { CustomTable } from '../../../features/table/ui/CustomTable';
import { useAuth } from '../../../shared/lib/AuthContext';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './ProductsTableWidget.module.scss';

const SEARCH_DEBOUNCE_MS = 400;

export const ProductsTableWidget = () => {
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchQuery]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerSpacer} />
        <div className={styles.logoutBtn}>
          <IconButton aria-label="delete" color="primary" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </header>
      <div>
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Найти товар" />
      </div>
      <div style={{ width: '100%', background: 'white', height: '100vh' }}>
        <div style={{ margin: '30px' }}>
          <CustomTable searchQuery={debouncedQuery} onProductAdded={() => setSnackbarOpen(true)} />
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Товар успешно добавлен"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};
