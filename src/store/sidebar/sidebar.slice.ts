import { createSlice } from '@reduxjs/toolkit';

import type { InitialState } from './types';

const initialState: InitialState = {
  open: false,
};

const slice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    reset: () => initialState,
    toggle: (state) => {
      state.open = !state.open;
    },
    close: (state) => {
      state.open = false;
    },
    open: (state) => {
      state.open = true;
    },
  },
});

export const { toggle, close, open } = slice.actions;

export default slice.reducer;
