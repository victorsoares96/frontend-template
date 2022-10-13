import { CardActionArea, Grid, RadioGroup, styled } from '@mui/material';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeTheme } from '@/store/settings/settings.slice';
import { ThemeMode } from '@/store/settings/types';

import { BoxMask } from '.';
import Iconify from '../Iconify';

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

export default function SettingMode() {
  const themeMode = useAppSelector((state) => state.settings.themeMode);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup
      name="themeMode"
      value={themeMode}
      onChange={(event) => dispatch(changeTheme(event.target.value as ThemeMode))}
    >
      <Grid dir="ltr" container spacing={2.5}>
        {['light', 'dark'].map((mode, index) => {
          const isSelected = themeMode === mode;

          return (
            <Grid key={mode} item xs={6}>
              <BoxStyle
                sx={{
                  bgcolor: mode === 'light' ? 'common.white' : 'grey.800',
                  ...(isSelected && {
                    color: 'primary.main',
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                }}
              >
                <Iconify
                  icon={index === 0 ? 'ph:sun-duotone' : 'ph:moon-duotone'}
                  width={28}
                  height={28}
                />
                <BoxMask value={mode} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
