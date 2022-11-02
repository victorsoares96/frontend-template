import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { countries } from '@/_mock';
import {
  FormProvider,
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/hook-form';

interface CheckoutNewAddressFormProps {
  open: boolean;
  onClose: () => void;
  onNextStep: () => void;
  onCreateBilling: (data: any) => void;
}

export default function CheckoutNewAddressForm({
  open,
  onClose,
  onNextStep,
  onCreateBilling,
}: CheckoutNewAddressFormProps) {
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });

  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: countries[0].label,
    zipcode: '',
    isDefault: true,
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: {
    receiver: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: number;
    addressType: string;
    isDefault: boolean;
  }) => {
    try {
      onNextStep();
      onCreateBilling({
        receiver: data.receiver,
        phone: data.phone,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}`,
        addressType: data.addressType,
        isDefault: data.isDefault,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Add new address</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <RHFRadioGroup name="addressType" options={['Home', 'Office']} />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="receiver" label="Full Name" />
              <RHFTextField name="phone" label="Phone Number" />
            </Box>

            <RHFTextField name="address" label="Address" />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="city" label="Town / City" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="zipcode" label="Zip / Postal Code" />
            </Box>

            <RHFSelect name="country" label="Country">
              {countries.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>

            <RHFCheckbox name="isDefault" label="Use this address as default." sx={{ mt: 3 }} />
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
