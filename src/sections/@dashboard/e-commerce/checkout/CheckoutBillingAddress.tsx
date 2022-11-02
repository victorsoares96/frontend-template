import { Fragment, useState } from 'react';

import { Box, Button, Card, Grid, Typography } from '@mui/material';

import PropTypes from 'prop-types';

import { _addressBooks } from '@/_mock';
import Iconify from '@/components/Iconify';
import Label from '@/components/Label';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { createBilling, onBackStep, onNextStep } from '@/store/slices/product';

import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import CheckoutSummary from './CheckoutSummary';

type Address = {
  receiver: string;
  fullAddress: string;
  addressType: string;
  phone: string;
  isDefault: boolean;
};

interface AddressItemProps {
  address: Address;
  onNextStep: () => void;
  onCreateBilling: (address: Address) => void;
}

function AddressItem({ address, onNextStep, onCreateBilling }: AddressItemProps) {
  const { receiver, fullAddress, addressType, phone, isDefault } = address;

  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{receiver}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({addressType})
        </Typography>

        {isDefault && (
          <Label color="info" sx={{ ml: 1 }}>
            Default
          </Label>
        )}
      </Box>

      <Typography variant="body2" gutterBottom>
        {fullAddress}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {phone}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 },
        }}
      >
        {!isDefault && (
          <Button variant="outlined" size="small" color="inherit">
            Delete
          </Button>
        )}
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={handleCreateBilling}>
          Deliver to this Address
        </Button>
      </Box>
    </Card>
  );
}

export default function CheckoutBillingAddress() {
  const dispatch = useAppDispatch();
  const { checkout } = useAppSelector((state) => state.product);
  const { total, discount, subtotal } = checkout;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = (address: Address) => {
    dispatch(createBilling(address));
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {_addressBooks.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onNextStep={handleNextStep}
              onCreateBilling={handleCreateBilling}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>
            <Button
              size="small"
              onClick={handleClickOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onCreateBilling={handleCreateBilling}
      />
    </Fragment>
  );
}
