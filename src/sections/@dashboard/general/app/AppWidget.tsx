import ReactApexChart from 'react-apexcharts';

import { Box, Card, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import merge from 'lodash/merge';
import PropTypes from 'prop-types';

import Iconify from '../../../../components/Iconify';
import { BaseOptionChart } from '../../../../components/chart';
import { fNumber } from '../../../../utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

interface AppWidgetProps {
  chartData: number;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  icon: string;
  title: string;
  total: number;
}

export default function AppWidget({
  title,
  total,
  icon,
  color = 'primary',
  chartData,
}: AppWidgetProps) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette[color].main],
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  return (
    <RootStyle
      sx={{
        bgcolor: theme.palette[color].darker,
      }}
    >
      <ReactApexChart
        type="radialBar"
        series={[chartData]}
        options={chartOptions}
        width={86}
        height={86}
      />
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {fNumber(total)}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
