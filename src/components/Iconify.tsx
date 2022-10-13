import { Box, BoxProps, SxProps, Theme } from '@mui/material';

import { Icon, IconifyIcon } from '@iconify/react';

interface Props extends BoxProps {
  icon: IconifyIcon | string;
  sx?: SxProps<Theme>;
}

export default function Iconify({ icon, sx, ...other }: Props) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}

Iconify.defaultProps = {
  sx: {},
};
