import { Button, Grid, LinearProgress, Link, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import sumBy from 'lodash/sumBy';

import Iconify from '@/components/Iconify';
import { fShortenNumber } from '@/utils/formatNumber';

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

interface ProductDetailsReviewOverviewProps {
  product: {
    totalRating: number;
    totalReview: number;
    ratings: {
      name: string;
      starCount: number;
      reviewCount: number;
    }[];
  };
  onOpen: () => void;
}

interface ProgressItemProps {
  star: {
    name: string;
    starCount: number;
    reviewCount: number;
  };
  total: number;
}

function ProgressItem({ star, total }: ProgressItemProps) {
  const { name, starCount, reviewCount } = star;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider',
        }}
      />
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}

export default function ProductDetailsReviewOverview({
  product,
  onOpen,
}: ProductDetailsReviewOverviewProps) {
  const { totalRating, totalReview, ratings } = product;

  const total = sumBy(ratings, (star) => star.starCount);

  return (
    <Grid container>
      <GridStyle item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {totalRating}/5
        </Typography>
        <RatingStyle readOnly value={totalRating} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(totalReview)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={total} />
            ))}
        </Stack>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Link href="#move_add_review" underline="none">
          <Button
            size="large"
            onClick={onOpen}
            variant="outlined"
            startIcon={<Iconify icon="eva:edit-2-fill" />}
          >
            Write your review
          </Button>
        </Link>
      </GridStyle>
    </Grid>
  );
}
