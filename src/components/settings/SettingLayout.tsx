import React from 'react';

import { Box, CardActionArea, Grid, RadioGroup, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeLayout } from '@/store/settings/settings.slice';
import { ThemeLayout } from '@/store/settings/types';

import { BoxMask } from '.';

const style = {
  width: 1,
  height: 32,
  borderRadius: 0.5,
};

interface VerticalBoxProps {
  isSelected: boolean;
}

function VerticalBox({ isSelected }: VerticalBoxProps) {
  return (
    <React.Fragment>
      <Box
        sx={{
          ...style,
          mb: 0.75,
          height: 12,
          bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.72),
          ...(isSelected && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.72),
          }),
        }}
      />
      <Box
        sx={{
          ...style,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.08),
          ...(isSelected && {
            border: (theme) => `dashed 1px ${theme.palette.primary.main}`,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          }),
        }}
      />
    </React.Fragment>
  );
}

interface HorizontalBoxProps {
  isSelected: boolean;
}

function HorizontalBox({ isSelected }: HorizontalBoxProps) {
  return (
    <React.Fragment>
      <Box
        sx={{
          ...style,
          mb: 0.75,
          height: 12,
          bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.72),
          ...(isSelected && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.72),
          }),
        }}
      />
      <Stack width={1} direction="row" justifyContent="space-between">
        <Box
          sx={{
            ...style,
            width: 20,
            bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.32),
            ...(isSelected && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.32),
            }),
          }}
        />
        <Box
          sx={{
            ...style,
            width: `calc(100% - 26px)`,
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
            bgcolor: (theme) => alpha(theme.palette.text.disabled, 0.08),
            ...(isSelected && {
              border: (theme) => `dashed 1px ${theme.palette.primary.main}`,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            }),
          }}
        />
      </Stack>
    </React.Fragment>
  );
}

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1.5),
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

export default function SettingLayout() {
  const themeLayout = useAppSelector((state) => state.settings.themeLayout);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup
      name="themeLayout"
      value={themeLayout}
      onChange={(event) => dispatch(changeLayout(event.target.value as ThemeLayout))}
    >
      <Grid dir="ltr" container spacing={2.5}>
        {['horizontal', 'vertical'].map((layout) => {
          const isSelected = themeLayout === layout;
          const isVertical = layout === 'vertical';

          return (
            <Grid key={layout} item xs={6}>
              <BoxStyle
                sx={{
                  ...(isSelected && {
                    color: 'primary.main',
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                }}
              >
                {isVertical ? (
                  <VerticalBox isSelected={isSelected} />
                ) : (
                  <HorizontalBox isSelected={isSelected} />
                )}
                <BoxMask value={layout} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
