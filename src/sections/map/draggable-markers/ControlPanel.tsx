import { memo } from 'react';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import cssStyles from '@/utils/cssStyles';

const EVENT_NAMES = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value: number) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

const RootStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ color: theme.palette.grey[900] }),
  zIndex: 9,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

interface ControlPanelProps {
  events?: {
    [key: string]: any;
  };
}

function ControlPanel({ events = {} }: ControlPanelProps) {
  return (
    <RootStyle>
      {EVENT_NAMES.map((event) => {
        const lngLat = events[event];
        return (
          <div key={event}>
            <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
              {event}:
            </Typography>
            {lngLat ? (
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                {lngLat.map(round5).join(', ')}
              </Typography>
            ) : (
              <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                <em>null</em>
              </Typography>
            )}
          </div>
        );
      })}
    </RootStyle>
  );
}

export default memo(ControlPanel);

ControlPanel.defaultProps = {
  events: {},
};
