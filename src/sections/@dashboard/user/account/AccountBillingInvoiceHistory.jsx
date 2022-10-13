import { Link as RouterLink } from 'react-router-dom';

// @mui
import { Button, Link, Stack, Typography } from '@mui/material';

import PropTypes from 'prop-types';

// components
import Iconify from '../../../../components/Iconify';
import { fCurrency } from '../../../../utils/formatNumber';
// utils
import { fDate } from '../../../../utils/formatTime.util';

// ----------------------------------------------------------------------

AccountBillingInvoiceHistory.propTypes = {
  invoices: PropTypes.array,
};

export default function AccountBillingInvoiceHistory({ invoices }) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack key={invoice.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {fDate(invoice.createdAt)}
            </Typography>
            <Typography variant="body2">{fCurrency(invoice.price)}</Typography>
            <Link component={RouterLink} to="#">
              PDF
            </Link>
          </Stack>
        ))}
      </Stack>

      <Button size="small" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
        All invoices
      </Button>
    </Stack>
  );
}
