/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rounded',
})(({ rounded }: { rounded: boolean }) => ({
  display: 'flex',
  listStyle: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  '& li': {
    width: 18,
    height: 18,
    opacity: 0.32,
    cursor: 'pointer',
  },
  '& li.slick-active': {
    opacity: 1,
    ...(rounded && {
      '& .dotActive': {
        width: 16,
        borderRadius: 6,
      },
    }),
  },
}));

const DotWrapStyle = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const DotStyle = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

interface Props extends BoxProps {
  color?: string;
  rounded?: boolean;
}

export default function CarouselDots(props?: Props) {
  const color = props?.color;
  const rounded = props?.rounded || false;

  return {
    appendDots: (dots: React.ReactNode) => (
      <React.Fragment>
        <RootStyle rounded={rounded} component="ul" {...props}>
          {dots}
        </RootStyle>
      </React.Fragment>
    ),
    customPaging: () => (
      <DotWrapStyle>
        <DotStyle
          className="dotActive"
          sx={{
            bgcolor: color || 'primary.main',
          }}
        />
      </DotWrapStyle>
    ),
  };
}
