import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import MyAvatar from '../../../components/MyAvatar';
import { PATH_DASHBOARD } from '../../../routes/paths';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

interface NavbarAccountProps {
  isCollapse: boolean;
}

export default function NavbarAccount({ isCollapse }: NavbarAccountProps) {
  const user = {
    displayName: 'Katarina Smith',
    role: 'Admin',
  };
  return (
    <Link underline="none" color="inherit" component={RouterLink} to={PATH_DASHBOARD.user.account}>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.role}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
