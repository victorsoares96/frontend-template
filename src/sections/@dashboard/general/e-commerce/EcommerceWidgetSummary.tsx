import ReactApexChart from 'react-apexcharts';

import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { ApexOptions } from 'apexcharts';
import merge from 'lodash/merge';

import Iconify from '@/components/Iconify';
import { BaseOptionChart } from '@/components/chart';
import { fNumber, fPercent } from '@/utils/formatNumber';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

interface EcommerceWidgetSummaryProps {
  chartColor: string;
  chartData: number[];
  percent: number;
  title: string;
  total: number;
}

export default function EcommerceWidgetSummary({
  title,
  percent,
  total,
  chartColor,
  chartData,
}: EcommerceWidgetSummaryProps) {
  const chartOptions: ApexOptions = merge(BaseOptionChart(), {
    colors: [chartColor],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(total)}
        </Typography>

        <Stack direction="row" alignItems="center">
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify
              width={16}
              height={16}
              icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
            />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
          <Typography variant="body2" component="span" noWrap sx={{ color: 'text.secondary' }}>
            &nbsp;than last week
          </Typography>
        </Stack>
      </Box>

      <ReactApexChart
        type="line"
        series={[{ data: chartData }]}
        options={chartOptions}
        width={120}
        height={80}
      />
    </Card>
  );
}
