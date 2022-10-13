import { Fragment, ReactFragment, forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
  title?: string;
  meta: React.ReactNode;
}

const Page = forwardRef<ReactFragment, Props>(({ children, title = '', meta, ...other }, ref) => (
  <Fragment>
    <Helmet>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </Fragment>
));

Page.defaultProps = {
  title: 'Minimal-UI',
};

export default Page;
