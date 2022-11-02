import ReactApexChart from 'react-apexcharts';

import { Box, Card, CardHeader, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import merge from 'lodash/merge';

import { BaseOptionChart } from '@/components/chart';
import { fNumber } from '@/utils/formatNumber';

const CHART_DATA = [75];
const SOLD_OUT = 120;
const AVAILABLE = 66;

interface LegendProps {
  label: string;
  number: number;
}

function Legend({ label, number }: LegendProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(label === 'Sold out' && {
              bgcolor: 'primary.main',
            }),
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number} Rooms</Typography>
    </Stack>
  );
}

export default function BookingRoomAvailable() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    grid: {
      padding: { top: -32, bottom: -32 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main },
          ],
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Rooms',
            formatter: () => fNumber(186),
          },
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Room Available" sx={{ mb: 8 }} />
      <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={310} />

      <Stack spacing={2} sx={{ p: 5 }}>
        <Legend label="Sold out" number={SOLD_OUT} />
        <Legend label="Available" number={AVAILABLE} />
      </Stack>
    </Card>
  );
}