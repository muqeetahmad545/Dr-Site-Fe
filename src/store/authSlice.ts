import { LOCAL_STORAGE_VARIABLES } from '../constants/localStoreVars';
import {
  getConstFromLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveConstToLocalStorage,
  saveToLocalStorage,
} from '../util/localStorageUtil';
import type { User } from '../types/user';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initUser = getFromLocalStorage(LOCAL_STORAGE_VARIABLES.AUTH_USER);
const initToken = getConstFromLocalStorage(
  LOCAL_STORAGE_VARIABLES.AUTH_SESSION
);

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: (initUser as User) || null,
  token: (initToken as string) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      saveToLocalStorage(LOCAL_STORAGE_VARIABLES.AUTH_USER, action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      removeFromLocalStorage(LOCAL_STORAGE_VARIABLES.AUTH_USER);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      saveConstToLocalStorage(
        LOCAL_STORAGE_VARIABLES.AUTH_SESSION,
        action.payload
      );
    },
    clearToken: (state) => {
      state.user = null;
      state.token = null;
      removeFromLocalStorage(LOCAL_STORAGE_VARIABLES.AUTH_SESSION);
      removeFromLocalStorage(LOCAL_STORAGE_VARIABLES.AUTH_USER);
    },
  },
});

export const { setUser, clearUser, setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
