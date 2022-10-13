import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { mainApi } from '@/api/main/main.api';

import type { InitialSessionState, Session, User } from './types';

function getSession(): Session | null {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  return session;
}

const initialState: InitialSessionState = {
  user: getSession()?.user || null,
  token: getSession()?.token || null,
  authenticated: !!getSession()?.token,
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    reset: () => initialState,
    changeUser: (state, action: PayloadAction<User>) => {
      const session = getSession();
      if (session) {
        session.user = action.payload;
        localStorage.setItem('session', JSON.stringify(session));
      }
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
      localStorage.removeItem('session');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(mainApi.endpoints.signIn.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.authenticated = true;

      const session: Session = {
        token: action.payload.token,
        user: action.payload.user,
      };
      localStorage.setItem(
        'session',
        JSON.stringify({
          ...session,
          authenticated: true,
        }),
      );
    });
  },
});

export const { changeUser, logout } = slice.actions;

export default slice.reducer;
