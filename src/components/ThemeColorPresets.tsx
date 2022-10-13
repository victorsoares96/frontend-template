import { useMemo } from 'react';

import { ThemeProvider, alpha, createTheme, useTheme } from '@mui/material/styles';

import { useAppSelector } from '@/hooks/useAppSelector';
import getColorPresets from '@/store/settings/settings.util';

import componentsOverride from '../theme/overrides';

interface Props {
  children: React.ReactNode;
}

export default function ThemeColorPresets({ children }: Props) {
  const defaultTheme = useTheme();
  const currentThemeColorPreset = useAppSelector((state) => state.settings.currentThemeColorPreset);

  const color = getColorPresets(currentThemeColorPreset.name);

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: color,
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(color.main, 0.24)}`,
      },
    }),
    [color, defaultTheme],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
