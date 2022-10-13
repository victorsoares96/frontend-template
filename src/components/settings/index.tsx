import { Fragment, useEffect, useState } from 'react';

import { Backdrop, Divider, FormControlLabel, Radio, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { AnimatePresence, m } from 'framer-motion';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { resetSettings } from '@/store/settings/settings.slice';

import { NAVBAR, defaultSettings } from '../../config';
import cssStyles from '../../utils/cssStyles';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { IconButtonAnimate, varFade } from '../animate';
import SettingColorPresets from './SettingColorPresets';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';
import SettingLayout from './SettingLayout';
import SettingMode from './SettingMode';
import SettingStretch from './SettingStretch';
import ToggleButton from './ToggleButton';

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  width: NAVBAR.BASE_WIDTH,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16,
  )}`,
}));

export default function Settings() {
  const themeMode = useAppSelector((state) => state.settings.themeMode);
  const themeDirection = useAppSelector((state) => state.settings.themeDirection);
  const currentThemeColorPreset = useAppSelector((state) => state.settings.currentThemeColorPreset);
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);
  const themeLayout = useAppSelector((state) => state.settings.themeLayout);

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeDirection !== defaultSettings.themeDirection ||
    currentThemeColorPreset.name !== defaultSettings.themeColorPresets ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch;

  const varSidebar =
    themeDirection !== 'rtl'
      ? varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inLeft;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ background: 'transparent', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />

      {!open && <ToggleButton open={open} notDefault={notDefault} onToggle={handleToggle} />}

      <AnimatePresence>
        {open && (
          <RootStyle {...varSidebar}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ py: 2, pr: 1, pl: 2.5 }}
            >
              <Typography variant="subtitle1">Settings</Typography>

              <div>
                <IconButtonAnimate onClick={() => dispatch(resetSettings())}>
                  <Iconify icon="ic:round-refresh" width={20} height={20} />
                </IconButtonAnimate>
                <IconButtonAnimate onClick={handleClose}>
                  <Iconify icon="eva:close-fill" width={20} height={20} />
                </IconButtonAnimate>
              </div>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Scrollbar sx={{ flexGrow: 1 }}>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Mode</Typography>
                  <SettingMode />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Direction</Typography>
                  <SettingDirection />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Layout</Typography>
                  <SettingLayout />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Presets</Typography>
                  <SettingColorPresets />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Stretch</Typography>
                  <SettingStretch />
                </Stack>

                <SettingFullscreen />
              </Stack>
            </Scrollbar>
          </RootStyle>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

interface BoxMaskProps {
  value?: string;
}

export function BoxMask({ value }: BoxMaskProps) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}

BoxMask.defaultProps = {
  value: undefined,
};
