import { Fragment, ReactFragment, forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  children: React.ReactNode;
  title?: string;
  meta?: React.ReactNode;
}

const Page = forwardRef<ReactFragment, Props>(
  ({ children, title = 'Minimal-UI', meta, ...other }, ref) => (
    <Fragment>
      <Helmet>
        <title>{`${title} | Minimal-UI`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </Fragment>
  ),
);

Page.defaultProps = {
  title: 'Minimal-UI',
  meta: null,
};

export default Page;
