import { Controller, useFormContext } from 'react-hook-form';

import { FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';

interface Props {
  name: string;
  options: string[];
  getOptionLabel?: string[];
}

export default function RHFRadioGroup({ name, options, getOptionLabel, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

RHFRadioGroup.defaultProps = {
  getOptionLabel: [],
};
