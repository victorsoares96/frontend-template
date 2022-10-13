import { Box, BoxProps, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { IconifyIcon } from '@iconify/react';

import Iconify from '../Iconify';
import { IconButtonAnimate } from '../animate';

const BUTTON_SIZE = 40;

const ArrowStyle = styled(IconButtonAnimate, {
  shouldForwardProp: (prop) => prop !== 'filled',
})(({ filled, theme }) => ({
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  cursor: 'pointer',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  ...(filled && {
    opacity: 0.48,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[900],
    '&:hover': {
      opacity: 1,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900],
    },
  }),
}));

interface Props extends BoxProps {
  children: React.ReactNode;
  customIcon?: IconifyIcon;
  filled?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

const leftIcon = (isRTL: boolean, customIcon?: IconifyIcon) => (
  <Iconify
    icon={customIcon || 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      transform: ' scaleX(-1)',
      ...(isRTL && { transform: ' scaleX(1)' }),
    }}
  />
);

const rightIcon = (isRTL: boolean, customIcon?: IconifyIcon) => (
  <Iconify
    icon={customIcon || 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      ...(isRTL && { transform: ' scaleX(-1)' }),
    }}
  />
);

function CarouselArrows({
  filled = false,
  customIcon, // Set icon right
  onNext,
  onPrevious,
  children,
  ...other
}: Props) {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  const style = {
    position: 'absolute',
    mt: -2.5,
    top: '50%',
    zIndex: 9,
  };

  if (children) {
    return (
      <Box {...other}>
        <Box className="arrow left" sx={{ ...style, left: 0 }}>
          <ArrowStyle filled={filled} onClick={onPrevious}>
            {leftIcon(isRTL, customIcon)}
          </ArrowStyle>
        </Box>

        {children}

        <Box className="arrow right" sx={{ ...style, right: 0 }}>
          <ArrowStyle filled={filled} onClick={onNext}>
            {rightIcon(isRTL, customIcon)}
          </ArrowStyle>
        </Box>
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={1} {...other}>
      <ArrowStyle className="arrow left" filled={filled} onClick={onPrevious}>
        {leftIcon(isRTL, customIcon)}
      </ArrowStyle>
      <ArrowStyle className="arrow right" filled={filled} onClick={onNext}>
        {rightIcon(isRTL, customIcon)}
      </ArrowStyle>
    </Stack>
  );
}

CarouselArrows.defaultProps = {
  filled: false,
  customIcon: undefined,
  onNext: () => {},
  onPrevious: () => {},
};

export default CarouselArrows;
