import { Fragment, useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import {
  Box,
  Collapse,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import Iconify from '../../components/Iconify';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';
import { NavSectionVertical } from '../../components/nav-section';
import { NAVBAR } from '../../config';

interface MenuMobileProps {
  isOffset: boolean;
  isHome: boolean;
  navConfig: {
    path: string;
    title: string;
    children: {
      children: any[];
      icon: any;
      path: string;
      title: string;
    };
  }[];
}

interface MenuMobileItemProps {
  isOpen: boolean;
  item: {
    children: any[];
    icon: any;
    path: string;
    title: string;
  };
  onOpen: () => void;
}

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <Fragment>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage:
                    'url(https://minimal-assets-api.vercel.app/assets/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
                },
              }}
            />
          </Box>
        </Collapse>
      </Fragment>
    );
  }

  if (title === 'Documentation') {
    return (
      <ListItemStyle
        LinkComponent={Link}
        href={path}
        target="_blank"
        rel="noopener"
        component={Link}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

export default function MenuMobile({ isOffset, isHome, navConfig }: MenuMobileProps) {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Fragment>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon="eva:menu-2-fill" />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </Fragment>
  );
}
