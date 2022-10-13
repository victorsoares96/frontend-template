import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';

interface Props {
  children: React.ReactNode;
}

export default function RtlLayout({ children }: Props) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
