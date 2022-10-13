import { CardActionArea, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggleStretch } from '@/store/settings/settings.slice';

import Iconify from '../Iconify';

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

export default function SettingStretch() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);
  const dispatch = useAppDispatch();

  const ICON_SIZE = {
    width: themeStretch ? 24 : 18,
    height: themeStretch ? 24 : 18,
  };

  return (
    <BoxStyle
      onClick={() => dispatch(toggleStretch())}
      sx={{
        ...(themeStretch && {
          color: (theme) => theme.palette.primary.main,
        }),
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 1,
          mx: 'auto',
          width: 0.5,
          height: 40,
          borderRadius: 1,
          color: 'action.active',
          bgcolor: 'background.default',
          boxShadow: (theme) => theme.customShadows.z12,
          transition: (theme) => theme.transitions.create('width'),
          ...(themeStretch && {
            width: 1,
            color: 'primary.main',
          }),
        }}
      >
        <Iconify
          icon={themeStretch ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
          {...ICON_SIZE}
        />
        <Iconify
          icon={themeStretch ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          {...ICON_SIZE}
        />
      </Stack>
    </BoxStyle>
  );
}
