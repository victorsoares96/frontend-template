export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

export type CustomThemeProviderProps = {
  children: JSX.Element;
};

export type CustomShadows = {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  dialog: string;
  dropdown: string;
};
