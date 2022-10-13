import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { colorPresets } from './settings.util';
import type { ColorPreset, InitialState, ThemeDirection, ThemeLayout, ThemeMode } from './types';

const initialState: InitialState = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: colorPresets,
  currentThemeColorPreset: colorPresets[0],
  themeLayout: 'horizontal',
  themeStretch: false,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: () => initialState,
    toggleTheme: (state) => {
      const nextTheme = state.themeMode === 'dark' ? 'light' : 'dark';
      state.themeMode = nextTheme;
      localStorage.setItem('theme-mode', nextTheme);
    },
    changeTheme: (state, action: PayloadAction<ThemeMode>) => {
      const { payload } = action;
      state.themeMode = payload;
      localStorage.setItem('theme-mode', payload);
    },
    changeDirection: (state, action: PayloadAction<ThemeDirection>) => {
      const { payload } = action;
      state.themeDirection = payload;
    },
    changeColorPreset: (state, action: PayloadAction<ColorPreset>) => {
      const { payload } = action;
      state.currentThemeColorPreset = payload;
    },
    toggleStretch: (state) => {
      state.themeStretch = !state.themeStretch;
    },
    changeLayout: (state, action: PayloadAction<ThemeLayout>) => {
      const { payload } = action;
      state.themeLayout = payload;
    },
  },
});

export const {
  toggleTheme,
  changeTheme,
  changeDirection,
  changeColorPreset,
  toggleStretch,
  changeLayout,
  resetSettings,
} = slice.actions;

export default slice.reducer;
