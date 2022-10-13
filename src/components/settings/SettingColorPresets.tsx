import { Box, CardActionArea, Grid, RadioGroup } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeColorPreset } from '@/store/settings/settings.slice';

import { BoxMask } from '.';

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

export default function SettingColorPresets() {
  const themeColorPresets = useAppSelector((state) => state.settings.themeColorPresets);
  const currentThemeColorPresets = useAppSelector(
    (state) => state.settings.currentThemeColorPreset,
  );

  const dispatch = useAppDispatch();
  return (
    <RadioGroup
      name="themeColorPresets"
      value={currentThemeColorPresets.name}
      onChange={(event) => {
        const colorPreset = themeColorPresets.find((preset) => preset.name === event.target.value);
        if (colorPreset) dispatch(changeColorPreset(colorPreset));
      }}
    >
      <Grid dir="ltr" container spacing={1.5}>
        {themeColorPresets.map((color) => {
          const colorName = color.name;
          const colorValue = color.main;
          const isSelected = currentThemeColorPresets.name === colorName;

          return (
            <Grid key={colorName} item xs={4}>
              <BoxStyle
                sx={{
                  ...(isSelected && {
                    bgcolor: alpha(colorValue, 0.08),
                    border: `solid 2px ${colorValue}`,
                    boxShadow: `inset 0 4px 8px 0 ${alpha(colorValue, 0.24)}`,
                  }),
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: colorValue,
                    transform: 'rotate(-45deg)',
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />

                <BoxMask value={colorName} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
