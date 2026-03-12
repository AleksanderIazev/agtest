import { apiService } from '../service/apiService';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
