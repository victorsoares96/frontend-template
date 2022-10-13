import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';

interface BreadcrumbsProps {
  activeLast?: boolean;
  links: Array<{
    name: string;
  }>;
}

interface LinkItemProps {
  link: {
    href?: string;
    icon?: React.ReactNode;
    name: string;
  };
}

function LinkItem({ link }: LinkItemProps) {
  const { href, name, icon } = link;
  return (
    <Link
      key={name}
      variant="body2"
      component={RouterLink}
      to={href || '#'}
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        '& > div': { display: 'inherit' },
      }}
    >
      {icon && <Box sx={{ mr: 1, '& svg': { width: 20, height: 20 } }}>{icon}</Box>}

      {name}
    </Link>
  );
}

export default function Breadcrumbs({ links, activeLast = false, ...other }: BreadcrumbsProps) {
  const currentLink = links[links.length - 1].name;

  const listDefault = links.map((link) => <LinkItem key={link.name} link={link} />);

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={
        <Box
          component="span"
          sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
}

Breadcrumbs.defaultProps = {
  activeLast: false,
};
