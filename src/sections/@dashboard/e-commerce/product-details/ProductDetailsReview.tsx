import { Fragment, useState } from 'react';

import { Collapse, Divider } from '@mui/material';

import ProductDetailsReviewForm from './ProductDetailsReviewForm';
import ProductDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewOverview from './ProductDetailsReviewOverview';

interface Props {
  product: any;
}

export default function ProductDetailsReview({ product }: Props) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <Fragment>
      <ProductDetailsReviewOverview product={product} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <ProductDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>

      <ProductDetailsReviewList product={product} />
    </Fragment>
  );
}
