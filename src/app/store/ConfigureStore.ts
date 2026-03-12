import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { apiService } from '../service/apiService';
import reducer from './Reducer';

export const initStore = () => {
  return configureStore({
    reducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
  });
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = initStore();
