import { Fragment, useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { ICON, NAVBAR } from '../../config';
import Iconify from '../Iconify';
import Logo from '../Logo';
import Scrollbar from '../Scrollbar';
import { Parent } from './types';

interface MegaMenuMobileProps {
  navConfig: Parent[];
}

interface ParentItemProps extends ListItemButtonProps {
  hasSub?: boolean;
  icon?: React.ReactNode;
  title: string;
}

interface SubMenuProps {
  parent: Parent & { icon: React.ReactNode };
  pathname: string;
}

function ParentItem({ icon, title, hasSub, ...other }: ParentItemProps) {
  return (
    <ListItemButton sx={{ textTransform: 'capitalize', height: 44 }} {...other}>
      <ListItemIcon sx={{ width: 22, height: 22 }}>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ typography: 'body2' }}>{title}</ListItemText>
      {hasSub && <Box component={Iconify} icon="eva:arrow-ios-forward-fill" />}
    </ListItemButton>
  );
}

function SubMenu({ parent, pathname }: SubMenuProps) {
  const [open, setOpen] = useState(false);
  const { title, icon, path, children } = parent;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (children) {
    return (
      <Fragment>
        <ParentItem title={title} icon={icon} onClick={handleOpen} hasSub />

        <Drawer
          open={open}
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH - 12 } }}
        >
          <Stack direction="row" alignItems="center" px={1} py={1.5}>
            <IconButton onClick={handleClose}>
              <Iconify icon="eva:arrow-ios-back-fill" width={20} height={20} />
            </IconButton>
            <Typography noWrap variant="subtitle1" sx={{ ml: 1, textTransform: 'capitalize' }}>
              {title}
            </Typography>
          </Stack>
          <Divider />

          <Scrollbar>
            <Stack spacing={5} py={3}>
              {children.map((list) => {
                const { subheader, items } = list;

                return (
                  <List key={subheader} disablePadding>
                    <Typography
                      component="div"
                      variant="overline"
                      sx={{ px: 2.5, mb: 1, color: 'text.secondary' }}
                      noWrap
                    >
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <ListItemButton
                        key={link.title}
                        component={RouterLink}
                        to={link.path}
                        sx={{ px: 1.5 }}
                      >
                        <ListItemIcon
                          sx={{
                            mr: 0.5,
                            width: ICON.NAVBAR_ITEM,
                            height: ICON.NAVBAR_ITEM,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              bgcolor: 'currentColor',
                              borderRadius: '50%',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={link.title}
                          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                );
              })}
            </Stack>
          </Scrollbar>
        </Drawer>
      </Fragment>
    );
  }

  return <ParentItem component={RouterLink} title={title} icon={icon} to={path} />;
}

export default function MegaMenuMobile({ navConfig }: MegaMenuMobileProps) {
  const { pathname } = useLocation();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (openDrawer) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={handleDrawerOpen}
        startIcon={<Iconify icon="eva:menu-2-fill" />}
      >
        Menu Mobile
      </Button>

      <Drawer
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: NAVBAR.DASHBOARD_WIDTH } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <Typography variant="h6" sx={{ px: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box component={Iconify} icon="eva:list-fill" sx={{ mr: 1, width: 24, height: 24 }} />{' '}
            Categories
          </Typography>

          {navConfig.map((parent) => (
            <SubMenu key={parent.title} parent={parent} pathname={pathname} />
          ))}
        </Scrollbar>
      </Drawer>
    </Fragment>
  );
}

ParentItem.defaultProps = {
  hasSub: false,
  icon: null,
};
