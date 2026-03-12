const AUTH_BASE_URL = 'https://dummyjson.com/auth';

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginError {
  message: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(
  username: string,
  password: string,
  expiresInMins = 60
): Promise<LoginResponse> {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  const res = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: trimmedUsername,
      password: trimmedPassword,
      expiresInMins,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Ошибка авторизации');
  }

  return data as LoginResponse;
}

export async function getCurrentUser(
  accessToken: string,
  signal?: AbortSignal
): Promise<AuthUser> {
  const res = await fetch(`${AUTH_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Ошибка получения пользователя');
  }

  return data as AuthUser;
}

export async function refreshSession(
  refreshToken: string,
  expiresInMins = 60
): Promise<RefreshResponse> {
  const res = await fetch(`${AUTH_BASE_URL}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken, expiresInMins }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Ошибка обновления сессии');
  }

  return data as RefreshResponse;
}
