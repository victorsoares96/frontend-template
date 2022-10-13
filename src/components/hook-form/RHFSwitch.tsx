import { Controller, useFormContext } from 'react-hook-form';

import { FormControlLabel, Switch } from '@mui/material';

interface Props {
  label: string | React.ReactNode;
  name: string;
}

export default function RHFSwitch({ label, name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}
