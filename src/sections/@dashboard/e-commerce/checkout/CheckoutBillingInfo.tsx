import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';

import Iconify from '@/components/Iconify';
import { useAppSelector } from '@/hooks/useAppSelector';

interface CheckoutBillingInfoProps {
  onBackStep: () => void;
}

export default function CheckoutBillingInfo({ onBackStep }: CheckoutBillingInfoProps) {
  const { checkout } = useAppSelector((state) => state.product);

  const { billing } = checkout;
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {billing?.receiver}&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            ({billing?.addressType})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {billing?.fullAddress}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {billing?.phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
