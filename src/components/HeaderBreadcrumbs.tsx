import { Box, Link, SxProps, Theme, Typography } from '@mui/material';

import isString from 'lodash/isString';

import Breadcrumbs from './Breadcrumbs';

interface HeaderBreadcrumbsProps {
  links: Array<{
    name: string;
    href?: string;
  }>;
  action?: React.ReactNode;
  heading: string;
  moreLink?: string | Array<string>;
  sx?: SxProps<Theme>;
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = '' || [],
  sx,
  ...other
}: HeaderBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}

HeaderBreadcrumbs.defaultProps = {
  action: null,
  moreLink: '',
  sx: {},
};
