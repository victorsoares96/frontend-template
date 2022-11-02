import { Controller, useFormContext } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
