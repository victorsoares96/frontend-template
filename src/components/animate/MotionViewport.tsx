import { Box } from '@mui/material';

import { m } from 'framer-motion';

import useResponsive from '../../hooks/useResponsive';
import { varContainer } from './variants';

interface Props {
  children: React.ReactNode;
  disableAnimatedMobile?: boolean;
}

function MotionViewport({ children, disableAnimatedMobile = true, ...other }: Props) {
  const isDesktop = useResponsive('up', 'sm');

  if (!isDesktop && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}

export default MotionViewport;

MotionViewport.defaultProps = {
  disableAnimatedMobile: true,
};
