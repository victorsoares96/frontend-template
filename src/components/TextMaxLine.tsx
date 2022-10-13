import { forwardRef } from 'react';

import { Link, SxProps, Theme, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import GetFontValue from '@/utils/get-font-value.util';

interface Props {
  asLink?: boolean;
  children: React.ReactNode;
  line?: number;
  persistent?: boolean;
  sx?: SxProps<Theme>;
  variant?: Variant;
}

const TextMaxLine = forwardRef<HTMLAnchorElement, Props>(
  ({ asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other }, ref) => {
    const { lineHeight } = GetFontValue(variant);

    const style: SxProps<Theme> = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    };

    if (asLink) {
      return (
        <Link color="inherit" ref={ref} variant={variant} sx={{ ...style }} {...other}>
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  },
);

TextMaxLine.defaultProps = {
  asLink: false,
  line: 2,
  persistent: false,
  sx: {},
  variant: 'body1',
};

export default TextMaxLine;
