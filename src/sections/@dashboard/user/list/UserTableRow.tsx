import { Fragment, MouseEvent, useState } from 'react';

import { Avatar, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Iconify from '@/components/Iconify';
import Label from '@/components/Label';
import { TableMoreMenu } from '@/components/table';

interface UserTableRowProps {
  row: {
    name: string;
    avatarUrl: string;
    company: string;
    role: string;
    isVerified: boolean;
    status: string;
  };
  selected: boolean;
  onEditRow: () => void;
  onSelectRow: () => void;
  onDeleteRow: () => void;
}

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: UserTableRowProps) {
  const theme = useTheme();

  const { name, avatarUrl, company, role, isVerified, status } = row;

  const [openMenu, setOpenMenuActions] = useState<(EventTarget & HTMLButtonElement) | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{company}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {role}
      </TableCell>

      <TableCell align="center">
        <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        />
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'banned' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <Fragment>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="eva:trash-2-outline" />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon="eva:edit-fill" />
                Edit
              </MenuItem>
            </Fragment>
          }
        />
      </TableCell>
    </TableRow>
  );
}
