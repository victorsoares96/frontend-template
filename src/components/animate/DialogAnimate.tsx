import { Box, Dialog, Paper, PaperProps, SxProps, Theme } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import { AnimatePresence, m } from 'framer-motion';

import { varFade } from './variants';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  sx?: SxProps<Theme>;
  variants?: {
    [key: string]: Variant;
  };
}

export default function DialogAnimate({
  open = false,
  variants,
  onClose,
  children,
  sx,
  ...other
}: Props) {
  const paperComponent = (props: PaperProps) => (
    <Box
      component={m.div}
      {...(variants ||
        varFade({
          distance: 120,
          durationIn: 0.32,
          durationOut: 0.24,
          easeIn: 'easeInOut',
        }).inUp)}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
      <Paper sx={sx} {...props}>
        {props.children}
      </Paper>
    </Box>
  );
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={paperComponent}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}

DialogAnimate.defaultProps = {
  sx: {},
  variants: null,
};
