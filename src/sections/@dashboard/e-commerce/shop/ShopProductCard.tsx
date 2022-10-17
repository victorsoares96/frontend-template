import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, Link, Stack, Typography } from '@mui/material';

import { paramCase } from 'change-case';

import Image from '@/components/Image';
import Label from '@/components/Label';
import { ColorPreview } from '@/components/color-utils';
import { PATH_DASHBOARD } from '@/routes/paths';
import { fCurrency } from '@/utils/formatNumber';

interface Props {
  product: any;
}

export default function ShopProductCard({ product }: Props) {
  const { name, cover, price, colors, status, priceSale } = product;

  const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <Image alt={name} src={cover} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {priceSale && (
              <Typography
                component="span"
                sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
              >
                {fCurrency(priceSale)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
