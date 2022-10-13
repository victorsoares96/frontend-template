import { Fragment, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Masonry from '@mui/lab/Masonry';
import {
  Divider,
  Link,
  LinkProps,
  List,
  ListItem,
  Paper,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import { NAVBAR } from '@/config';

import Iconify from '../Iconify';
import MegaMenuCarousel from './MenuCarousel';
import MenuHotProducts from './MenuHotProducts';
import { Parent } from './types';

const MENU_PAPER_WIDTH = 800;
const PARENT_ITEM_HEIGHT = 40;

interface MegaMenuDesktopVerticalProps {
  navConfig: Parent[];
}

interface MegaMenuItemProps {
  parent: Parent;
}

interface ParentItemProps extends LinkProps {
  hasSub?: boolean;
  open?: boolean;
  path: string;
  title: string;
}

function ParentItem({ path, title, open, hasSub, ...other }: ParentItemProps) {
  const activeStyle = {
    color: 'primary.main',
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
  };

  return (
    <ListItem
      to={path}
      component={RouterLink}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: PARENT_ITEM_HEIGHT,
        cursor: 'pointer',
        color: 'text.primary',
        typography: 'subtitle2',
        textTransform: 'capitalize',
        justifyContent: 'space-between',
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle),
      }}
      {...other}
    >
      {title}
      {hasSub && <Iconify icon="eva:chevron-right-fill" sx={{ ml: 1, width: 20, height: 20 }} />}
    </ListItem>
  );
}

function MegaMenuItem({ parent }: MegaMenuItemProps) {
  const { title, path, more, products, tags, children } = parent;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <Fragment>
        <ParentItem
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          path={path}
          title={title}
          open={open}
          hasSub
        />

        {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              top: -62,
              borderRadius: 2,
              position: 'absolute',
              left: NAVBAR.BASE_WIDTH,
              width: MENU_PAPER_WIDTH,
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            <Masonry columns={3} spacing={2}>
              {children.map((list) => (
                <Stack key={list.subheader} spacing={1.25} sx={{ mb: 2.5 }}>
                  <Typography variant="subtitle1" noWrap>
                    {list.subheader}
                  </Typography>
                  {list.items.map((link) => (
                    <Link
                      noWrap
                      key={link.title}
                      component={RouterLink}
                      to={link.path}
                      underline="none"
                      sx={{
                        typography: 'body2',
                        color: 'text.primary',
                        fontSize: 13,
                        transition: (theme) => theme.transitions.create('all'),
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.title}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Masonry>

            {!!more && !!products && !!tags && (
              <Stack spacing={3}>
                <Link
                  to={more.path}
                  component={RouterLink}
                  sx={{ typography: 'body2', display: 'inline-flex', fontSize: 13 }}
                >
                  {more.title}
                </Link>

                <Divider />
                <MegaMenuCarousel
                  products={products}
                  numberShow={6}
                  sx={{ '& .controlsArrows': { mt: 5 } }}
                />
                <Divider />

                <MenuHotProducts tags={tags} />
              </Stack>
            )}
          </Paper>
        )}
      </Fragment>
    );
  }

  return <ParentItem path={path} title={title} />;
}

export default function MegaMenuDesktopVertical({
  navConfig,
  ...other
}: MegaMenuDesktopVerticalProps) {
  return (
    <List disablePadding {...other}>
      {navConfig.map((parent) => (
        <MegaMenuItem key={parent.title} parent={parent} />
      ))}
    </List>
  );
}

ParentItem.defaultProps = {
  hasSub: false,
  open: false,
};
