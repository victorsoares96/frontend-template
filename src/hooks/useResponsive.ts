import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Query = 'up' | 'down' | 'between' | 'only';

export default function useResponsive(
  query: Query,
  key: Breakpoint,
  start?: number | Breakpoint,
  end?: number | Breakpoint,
) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(key));

  const mediaDown = useMediaQuery(theme.breakpoints.down(key));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start ?? 0, end ?? 0));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  if (query === 'only') {
    return mediaOnly;
  }
  return null;
}
