import { Box } from '@mui/material';

import { m } from 'framer-motion';

import { varContainer } from './variants';

interface Props {
  children: React.ReactNode;
  action?: boolean;
  animate?: boolean;
}

function MotionContainer({ animate, action = false, children, ...other }: Props) {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}

MotionContainer.defaultProps = {
  action: false,
  animate: true,
};

export default MotionContainer;
