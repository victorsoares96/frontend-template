import { useRef } from 'react';
import Slider from 'react-slick';

import { Avatar, Button, Card, CardHeader, Chip, Rating, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { _bookingReview } from '@/_mock';
import Iconify from '@/components/Iconify';
import { CarouselArrows } from '@/components/carousel';
import { fDateTime } from '@/utils/formatTime.util';

interface ReviewItemProps {
  item: {
    avatar: string;
    description: string;
    name: string;
    postedAt: Date;
    rating: number;
    tags: string[];
  };
}

function ReviewItem({ item }: ReviewItemProps) {
  const { avatar, name, description, rating, postedAt, tags } = item;

  return (
    <Stack spacing={2} sx={{ minHeight: 402, position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={name} src={avatar} />
        <div>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {fDateTime(postedAt)}
          </Typography>
        </div>
      </Stack>

      <Rating value={rating} size="small" readOnly precision={0.5} />
      <Typography variant="body2">{description}</Typography>

      <Stack direction="row" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip size="small" key={tag} label={tag} sx={{ mr: 1, mb: 1, color: 'text.secondary' }} />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
        >
          Accept
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          endIcon={<Iconify icon="eva:close-circle-fill" />}
        >
          Reject
        </Button>
      </Stack>
    </Stack>
  );
}

export default function BookingCustomerReviews() {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    adaptiveHeight: true,
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <CardHeader
        title="Customer Reviews"
        subheader={`${_bookingReview.length} Reviews`}
        action={
          <CarouselArrows
            customIcon="ic:round-keyboard-arrow-right"
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
          },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {_bookingReview.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
