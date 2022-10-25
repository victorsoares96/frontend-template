import { NavLink as RouterLink } from 'react-router-dom';

import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import Iconify from '@/components/Iconify';
import { PATH_DASHBOARD } from '@/routes/paths';

type Label = {
  id: string;
  name: string;
  type: 'system' | 'custom';
  unreadCount: number;
  color: string;
};

const LABEL_ICONS = {
  all: 'eva:email-fill',
  inbox: 'eva:inbox-fill',
  trash: 'eva:trash-2-outline',
  drafts: 'eva:file-fill',
  spam: 'ic:round-report',
  sent: 'ic:round-send',
  starred: 'eva:star-fill',
  important: 'ic:round-label-important',
  id_social: 'eva:share-fill',
  id_promotions: 'ic:round-label',
  id_forums: 'ic:round-forum',
};

const linkTo = (label: Label) => {
  const baseUrl = PATH_DASHBOARD.mail.root;

  if (label.type === 'system') {
    return `${baseUrl}/${label.id}`;
  }
  if (label.type === 'custom') {
    return `${baseUrl}/label/${label.name}`;
  }
  return baseUrl;
};

interface MailSidebarItemProps {
  label: Label;
}

export default function MailSidebarItem({ label, ...other }: MailSidebarItemProps) {
  const isUnread = label.unreadCount > 0;

  return (
    <ListItemButton
      to={linkTo(label)}
      component={RouterLink}
      sx={{
        px: 3,
        height: 48,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        '&.active': {
          color: 'text.primary',
          fontWeight: 'fontWeightMedium',
          bgcolor: 'action.selected',
        },
      }}
      {...other}
    >
      <ListItemIcon>
        <Iconify
          icon={LABEL_ICONS[label.id]}
          style={{ color: label.color }}
          width={24}
          height={24}
        />
      </ListItemIcon>

      <ListItemText disableTypography primary={label.name} />

      {isUnread && <Typography variant="caption">{label.unreadCount}</Typography>}
    </ListItemButton>
  );
}
