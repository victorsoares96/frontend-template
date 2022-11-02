import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { fShortenNumber } from '@/utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
}));

interface BookingWidgetSummaryProps {
  icon: React.ReactNode;
  title: string;
  total: number;
}

export default function BookingWidgetSummary({ title, total, icon }: BookingWidgetSummaryProps) {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  );
}
