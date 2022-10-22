import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Iconify from '@/components/Iconify';
import Image from '@/components/Image';
import useResponsive from '@/hooks/useResponsive';

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

interface CheckoutPaymentMethodsProps {
  paymentOptions: {
    title: string;
    description: string;
    value: string;
    icons: string[];
  }[];
  cardOptions: {
    title: string;
    description: string;
    value: string;
    label: string;
  }[];
}

export default function CheckoutPaymentMethods({
  paymentOptions,
  cardOptions,
}: CheckoutPaymentMethodsProps) {
  const { control } = useFormContext();

  const isDesktop = useResponsive('up', 'sm');

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Payment options" />
      <CardContent>
        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <React.Fragment>
              <RadioGroup row {...field}>
                <Stack spacing={2}>
                  {paymentOptions.map((method) => {
                    const { value, title, icons, description } = method;

                    const hasChildren = value === 'credit_card';

                    const selected = field.value === value;

                    return (
                      <OptionStyle
                        key={title}
                        sx={{
                          ...(selected && {
                            boxShadow: (theme) => theme.customShadows.z20,
                          }),
                          ...(hasChildren && { flexWrap: 'wrap' }),
                        }}
                      >
                        <FormControlLabel
                          value={value}
                          control={
                            <Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />
                          }
                          label={
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="subtitle2">{title}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {description}
                              </Typography>
                            </Box>
                          }
                          sx={{ flexGrow: 1, py: 3 }}
                        />

                        {isDesktop && (
                          <Stack direction="row" spacing={1} flexShrink={0}>
                            {icons.map((icon) => (
                              <Image key={icon} alt="logo card" src={icon} />
                            ))}
                          </Stack>
                        )}

                        {hasChildren && (
                          <Collapse in={field.value === 'credit_card'} sx={{ width: 1 }}>
                            <TextField
                              select
                              fullWidth
                              label="Cards"
                              SelectProps={{ native: true }}
                            >
                              {cardOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>

                            <Button
                              size="small"
                              startIcon={<Iconify icon="eva:plus-fill" width={20} height={20} />}
                              sx={{ my: 3 }}
                            >
                              Add new card
                            </Button>
                          </Collapse>
                        )}
                      </OptionStyle>
                    );
                  })}
                </Stack>
              </RadioGroup>

              {!!error && (
                <FormHelperText error sx={{ pt: 1, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </React.Fragment>
          )}
        />
      </CardContent>
    </Card>
  );
}
