import { ScaleControl } from 'react-map-gl';

import { Theme } from '@mui/material';
import { SxProps, styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 99,
  position: 'absolute',
  left: theme.spacing(1.5),
  bottom: theme.spacing(3.5),
  boxShadow: theme.customShadows.z8,
  '& .mapboxgl-ctrl': {
    border: 'none',
    borderRadius: 4,
    lineHeight: '14px',
    color: theme.palette.common.white,
    backgroundImage: `linear-gradient(to right, #8a2387, #e94057, #f27121)`,
  },
}));

interface Props {
  sx?: SxProps<Theme>;
}

export default function MapControlScale({ sx, ...other }: Props) {
  return (
    <RootStyle sx={sx}>
      <ScaleControl maxWidth={100} unit="imperial" {...other} />
    </RootStyle>
  );
}

MapControlScale.defaultProps = {
  sx: {},
};
