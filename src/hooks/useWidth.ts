import { useTheme } from '@mui/material';

import useResponsive from './useResponsive';

export function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    // @ts-ignore
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useResponsive('up', key);
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
