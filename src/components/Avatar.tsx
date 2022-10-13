import { forwardRef } from 'react';

import { Avatar as MUIAvatar, AvatarProps as MuiAvatarProps, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props extends MuiAvatarProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

const Avatar = forwardRef<HTMLDivElement, Props>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === 'default') {
      return (
        <MUIAvatar ref={ref} sx={sx} {...other}>
          {children}
        </MUIAvatar>
      );
    }

    return (
      <MUIAvatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  },
);

Avatar.defaultProps = {
  color: 'default',
  sx: {},
};

export default Avatar;
