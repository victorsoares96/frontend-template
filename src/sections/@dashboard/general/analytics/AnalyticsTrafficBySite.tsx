import { Box, Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material';

import { _analyticTraffic } from '@/_mock';
import { fShortenNumber } from '@/utils/formatNumber';

interface SiteItemProps {
  site: {
    icon: any;
    name: string;
    value: number;
  };
}

function SiteItem({ site }: SiteItemProps) {
  const { icon, value, name } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{fShortenNumber(value)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function AnalyticsTrafficBySite() {
  return (
    <Card>
      <CardHeader title="Traffic by Site" />
      <CardContent>
        <Grid container spacing={2}>
          {_analyticTraffic.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
