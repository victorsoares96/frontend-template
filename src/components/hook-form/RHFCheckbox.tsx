import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

interface RHFCheckboxProps {
  label: string | React.ReactNode;
  name: string;
}

export function RHFCheckbox({ label, name, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

interface RHFMultiCheckboxProps {
  name: string;
  options: string[];
}

export function RHFMultiCheckbox({ name, options, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: unknown) =>
          field.value.includes(option)
            ? field.value.filter((value: unknown) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
