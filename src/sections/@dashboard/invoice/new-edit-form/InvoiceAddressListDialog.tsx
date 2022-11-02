import { Button, Dialog, ListItemButton, Stack, Typography } from '@mui/material';

import Iconify from '@/components/Iconify';
import Scrollbar from '@/components/Scrollbar';

type Address = {
  id: number;
  name: string;
  address: string;
  company: string;
};

interface InvoiceAddressListDialogProps {
  addressOptions: Address[];
  onClose: () => void;
  onSelect: (address: Address) => void;
  open: boolean;
  selected: (id: number) => boolean;
}

export default function InvoiceAddressListDialog({
  open,
  selected,
  onClose,
  onSelect,
  addressOptions,
}: InvoiceAddressListDialogProps) {
  const handleSelect = (address: Address) => {
    onSelect(address);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2.5, px: 3 }}
      >
        <Typography variant="h6"> Select address </Typography>

        <Button
          size="small"
          variant="outlined"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Add New
        </Button>
      </Stack>

      <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8 }}>
        {addressOptions.map((address) => (
          <ListItemButton
            key={address.id}
            selected={selected(address.id)}
            onClick={() => handleSelect(address)}
            sx={{
              p: 1.5,
              borderRadius: 1,
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="subtitle2">{address.name}</Typography>

            <Typography
              variant="caption"
              sx={{ color: 'primary.main', my: 0.5, fontWeight: 'fontWeightMedium' }}
            >
              {address.company}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {address.address}
            </Typography>
          </ListItemButton>
        ))}
      </Scrollbar>
    </Dialog>
  );
}
