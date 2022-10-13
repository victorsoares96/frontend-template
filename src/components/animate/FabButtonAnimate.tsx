import { forwardRef } from 'react';

import { Box, Fab, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { m } from 'framer-motion';

interface FabButtonAnimateProps {
  children: React.ReactNode;
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  sxWrap?: SxProps<Theme>;
}

interface AnimateWrapProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  sxWrap?: SxProps<Theme>;
}

const varSmall = {
  hover: { scale: 1.07 },
  tap: { scale: 0.97 },
};

const varMedium = {
  hover: { scale: 1.06 },
  tap: { scale: 0.98 },
};

const varLarge = {
  hover: { scale: 1.05 },
  tap: { scale: 0.99 },
};

function AnimateWrap({ size, children, sxWrap }: AnimateWrapProps) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
        ...sxWrap,
      }}
    >
      {children}
    </Box>
  );
}

const FabButtonAnimate = forwardRef<HTMLButtonElement, FabButtonAnimateProps>(
  ({ color = 'primary', size = 'large', children, sx, sxWrap, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <AnimateWrap size={size} sxWrap={sxWrap}>
          <Fab ref={ref} size={size} color={color} sx={sx} {...other}>
            {children}
          </Fab>
        </AnimateWrap>
      );
    }

    return (
      <AnimateWrap size={size} sxWrap={sxWrap}>
        <Fab
          ref={ref}
          size={size}
          sx={{
            boxShadow: theme.customShadows[color],
            color: theme.palette[color].contrastText,
            bgcolor: theme.palette[color].main,
            '&:hover': {
              bgcolor: theme.palette[color].dark,
            },
            ...sx,
          }}
          {...other}
        >
          {children}
        </Fab>
      </AnimateWrap>
    );
  },
);

AnimateWrap.defaultProps = {
  size: 'medium',
  sxWrap: {},
};

FabButtonAnimate.defaultProps = {
  color: 'primary',
  size: 'large',
  sx: {},
  sxWrap: {},
};

export default FabButtonAnimate;
