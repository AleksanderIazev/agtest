import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  login as apiLogin,
  getCurrentUser,
  refreshSession,
  type LoginResponse,
} from '../api/authApi';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const REMEMBER_KEY = 'auth_remember';

type Storage = typeof localStorage | typeof sessionStorage;

function getStorage(remember: boolean): Storage {
  return remember ? localStorage : sessionStorage;
}

function loadTokenFromStorage(): {
  accessToken: string | null;
  refreshToken: string | null;
  remember: boolean;
} {
  // Сначала проверяем sessionStorage (сессия для текущей вкладки)
  const sessionAccess = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const sessionRefresh = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  if (sessionAccess && sessionRefresh) {
    return {
      accessToken: sessionAccess,
      refreshToken: sessionRefresh,
      remember: false,
    };
  }

  // Затем localStorage (если был "запомнить")
  const localRemember = localStorage.getItem(REMEMBER_KEY);
  if (localRemember === 'true') {
    const localAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
    const localRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (localAccess && localRefresh) {
      return {
        accessToken: localAccess,
        refreshToken: localRefresh,
        remember: true,
      };
    }
  }

  return { accessToken: null, refreshToken: null, remember: false };
}

function clearAllAuthStorage(): void {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REMEMBER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
}

interface AuthContextValue {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [, setRefreshToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const saveTokens = React.useCallback(
    (data: LoginResponse | { accessToken: string; refreshToken: string }, remember?: boolean) => {
      const shouldRemember = remember ?? localStorage.getItem(REMEMBER_KEY) === 'true';
      const storage = getStorage(shouldRemember);

      clearAllAuthStorage();
      storage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      storage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      if (shouldRemember) {
        localStorage.setItem(REMEMBER_KEY, 'true');
      }

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    []
  );

  const loadSession = React.useCallback(
    async (signal?: AbortSignal) => {
      const { accessToken: token, refreshToken: refToken, remember } =
        loadTokenFromStorage();

      if (!token || !refToken) {
        setIsLoading(false);
        return;
      }

      try {
        await getCurrentUser(token, signal);
        if (signal?.aborted) return;
        setAccessToken(token);
        setRefreshToken(refToken);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        try {
          const refreshed = await refreshSession(refToken);
          saveTokens(refreshed, remember);
        } catch {
          clearAllAuthStorage();
          setAccessToken(null);
          setRefreshToken(null);
        }
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [saveTokens]
  );

  React.useEffect(() => {
    const ac = new AbortController();
    loadSession(ac.signal);
    return () => ac.abort();
  }, [loadSession]);

  const login = React.useCallback(
    async (username: string, password: string, remember: boolean) => {
      setError(null);
      setIsLoading(true);

      const storage = getStorage(remember);

      try {
        const data = await apiLogin(username, password);
        clearAllAuthStorage();
        storage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        storage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        if (remember) {
          localStorage.setItem(REMEMBER_KEY, 'true');
        }
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate('/table');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ошибка авторизации';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const logout = React.useCallback(() => {
    clearAllAuthStorage();
    setAccessToken(null);
    setRefreshToken(null);
    setError(null);
    navigate('/login');
  }, [navigate]);

  const clearError = React.useCallback(() => setError(null), []);

  const value: AuthContextValue = {
    accessToken,
    isAuthenticated: !!accessToken,
    isLoading,
    login,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
