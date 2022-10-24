import { Fragment, MouseEvent, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { sentenceCase } from 'change-case';
import { format } from 'date-fns';

import { _bookings } from '@/_mock';
import Iconify from '@/components/Iconify';
import Label from '@/components/Label';
import MenuPopover from '@/components/MenuPopover';
import Scrollbar from '@/components/Scrollbar';

function MoreMenuButton() {
  const [open, setOpen] = useState<(EventTarget & HTMLButtonElement) | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <Fragment>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon="eva:download-fill" sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon="eva:printer-fill" sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon="eva:share-fill" sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </Fragment>
  );
}

export default function BookingDetails() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <Card>
      <CardHeader title="Booking Details" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 240 }}>Booker</TableCell>
                <TableCell sx={{ minWidth: 160 }}>Check In</TableCell>
                <TableCell sx={{ minWidth: 160 }}>Check Out</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Phone</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Room Type</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {_bookings.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={row.name} src={row.avatar} />
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{format(new Date(row.checkIn), 'dd MMM yyyy')}</TableCell>
                  <TableCell>{format(new Date(row.checkOut), 'dd MMM yyyy')}</TableCell>

                  <TableCell>
                    <Label
                      variant={isLight ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'paid' && 'success') ||
                        (row.status === 'pending' && 'warning') ||
                        'error'
                      }
                    >
                      {sentenceCase(row.status)}
                    </Label>
                  </TableCell>

                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{row.roomType}</TableCell>

                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
