import { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';

import { useAppSelector } from '@/hooks/useAppSelector';

import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';

type CustomThemeProviderProps = {
  children: JSX.Element;
};

export default function ThemeProvider({ children }: CustomThemeProviderProps) {
  const themeMode = useAppSelector((state) => state.settings.themeMode);
  const themeDirection = useAppSelector((state) => state.settings.themeDirection);

  const themeOptions = useMemo(
    () => ({
      palette: themeMode === 'light' ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: themeMode === 'light' ? shadows.light : shadows.dark,
      customShadows: themeMode === 'light' ? customShadows.light : customShadows.dark,
    }),
    [themeDirection, themeMode],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
