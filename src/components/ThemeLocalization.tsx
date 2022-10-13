import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

import useLocales from '@/hooks/useLocales';

interface Props {
  children: React.ReactNode;
}

export default function ThemeLocalization({ children }: Props) {
  const defaultTheme = useTheme();
  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
