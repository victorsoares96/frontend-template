import { Box } from '@mui/material';

import { SkeletonProductItem } from '@/components/skeleton';

import ShopProductCard from './ShopProductCard';

interface Props {
  products: any[];
  loading: boolean;
}

export default function ShopProductList({ products, loading }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? (
          <ShopProductCard key={product.id} product={product} />
        ) : (
          <SkeletonProductItem key={index} />
        ),
      )}
    </Box>
  );
}
