import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';

interface Props {
  tags: {
    name: string;
    path: string;
  }[];
}

export default function MenuHotProducts({ tags, ...other }: Props) {
  return (
    <Box {...other}>
      <Typography variant="caption" fontWeight="fontWeightBold">
        Hot Products:
      </Typography>
      &nbsp;
      {tags.map((tag, index) => (
        <Link
          component={RouterLink}
          key={tag.name}
          to={tag.path}
          underline="none"
          variant="caption"
          sx={{
            color: 'text.secondary',
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': { color: 'primary.main' },
          }}
        >
          {index === 0 ? tag.name : `, ${tag.name} `}
        </Link>
      ))}
    </Box>
  );
}
