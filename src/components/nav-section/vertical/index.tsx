import { Box, BoxProps, List, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';

import { NavListRoot } from './NavList';

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

interface Props extends BoxProps {
  navConfig: {
    subheader: string;
    items: any[];
  }[];
  isCollapse?: boolean;
}

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }: Props) {
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}
    </Box>
  );
}

NavSectionVertical.defaultProps = {
  isCollapse: false,
};
