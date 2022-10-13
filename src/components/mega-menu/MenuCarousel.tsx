import { useRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Link, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Image from '../Image';
import TextMaxLine from '../TextMaxLine';
import { CarouselArrows, CarouselDots } from '../carousel';

interface Props {
  numberShow?: number;
  products: any[];
  sx?: SxProps<Theme>;
}

export default function MenuCarousel({ products, numberShow, sx }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots(),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{
          '& .arrow button': {
            p: 0,
            width: 24,
            height: 24,
            top: -20,
          },
        }}
      >
        <Slider ref={carouselRef} {...settings}>
          {products.map((product) => (
            <Box key={product.name} sx={{ px: 1, textAlign: 'center' }}>
              <Link
                component={RouterLink}
                color="inherit"
                underline="none"
                to={product.path}
                sx={{
                  display: 'block',
                  transition: (theme_: Theme) => theme_.transitions.create('all'),
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Image
                  src={product.image}
                  ratio="1/1"
                  disabledEffect
                  sx={{ borderRadius: 1, mb: 1 }}
                />
                <TextMaxLine line={2} variant="caption" sx={{ fontWeight: 'fontWeightMedium' }}>
                  {product.name}
                </TextMaxLine>
              </Link>
            </Box>
          ))}
        </Slider>
      </CarouselArrows>
    </Box>
  );
}

MenuCarousel.defaultProps = {
  numberShow: 4,
  sx: {},
};
