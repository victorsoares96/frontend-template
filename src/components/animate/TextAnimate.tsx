import { Box, SxProps, Theme } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import { m } from 'framer-motion';

import { varFade } from './variants';

interface Props {
  text: string;
  variants?: {
    [key: string]: Variant;
  };
  sx?: SxProps<Theme>;
}

function TextAnimate({ text, variants, sx, ...other }: Props) {
  return (
    <Box
      component={m.h1}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.defaultProps = {
  variants: undefined,
  sx: {},
};

export default TextAnimate;
