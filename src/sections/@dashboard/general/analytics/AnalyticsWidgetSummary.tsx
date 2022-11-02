import { Card, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import Iconify from '@/components/Iconify';
import { fShortenNumber } from '@/utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

interface AnalyticsWidgetSummaryProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  icon: string;
  title: string;
  total: number;
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
}: AnalyticsWidgetSummaryProps) {
  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24,
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}

AnalyticsWidgetSummary.defaultProps = {
  color: 'primary',
};
