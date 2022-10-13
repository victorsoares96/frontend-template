import { Color, TypeAction } from '@mui/material';
import { PaletteColorOptions } from '@mui/material/styles';

import { CustomShadows } from './types';

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette & {
      neutral: PaletteColor;
      grey: Color;
      action: TypeAction;
    };
    customShadows: CustomShadows;
    status: {
      danger: string;
    };
  }

  interface Palette {
    neutral: PaletteColor;
    // grey: Color;
    gradients: {
      primary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
    chart: {
      violet: string[];
      blue: string[];
      green: string[];
      yellow: string[];
      red: string[];
    };
  }

  interface TypeBackground {
    default: string;
    paper: string;
    neutral: string;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    action?: Partial<TypeAction>;
  }

  interface PaletteColor {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
    customShadows?: CustomShadows;
  }
}
