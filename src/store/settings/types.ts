export type ColorPreset = {
  name: ColorPresetType;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ColorPresetType = 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red';

export type ThemeDirection = 'ltr' | 'rtl';

export type ThemeMode = 'light' | 'dark';

export type ThemeLayout = 'horizontal' | 'vertical';

export type InitialState = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
  themeColorPresets: ColorPreset[];
  currentThemeColorPreset: ColorPreset;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
};
