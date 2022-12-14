import { Fragment, MouseEvent, useState } from 'react';

import { Avatar, ListItemAvatar, ListItemText, MenuItem, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { _contacts } from '@/_mock';
import BadgeStatus from '@/components/BadgeStatus';
import Iconify from '@/components/Iconify';
import MenuPopover from '@/components/MenuPopover';
import Scrollbar from '@/components/Scrollbar';
import { IconButtonAnimate } from '@/components/animate';
import { fToNow } from '@/utils/formatTime.util';

const ITEM_HEIGHT = 64;

export default function ContactsPopover() {
  const [open, setOpen] = useState<(EventTarget & HTMLButtonElement) | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <Fragment>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          bgcolor: (theme) => (open ? alpha(theme.palette.primary.main, 0.08) : 'transparent'),
          /* ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }), */
        }}
      >
        <Iconify icon="eva:people-fill" width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span">({_contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {_contacts.map((contact) => (
            <MenuItem key={contact.id}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={contact.avatar} />
                <BadgeStatus
                  status={contact.status}
                  sx={{ position: 'absolute', right: 1, bottom: 1 }}
                />
              </ListItemAvatar>

              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={contact.name}
                secondary={contact.status === 'offline' && fToNow(contact.lastActivity)}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </Fragment>
  );
}
