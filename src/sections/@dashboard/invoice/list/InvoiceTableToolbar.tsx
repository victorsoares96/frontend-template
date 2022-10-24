import DatePicker from '@mui/lab/DatePicker';
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';

import Iconify from '@/components/Iconify';

const INPUT_WIDTH = 160;

interface InvoiceTableToolbarProps {
  filterName: string;
  filterService: string;
  filterEndDate: Date;
  filterStartDate: Date;
  onFilterName: (name: string) => void;
  onFilterEndDate: (newValue: Date | null) => void;
  onFilterService: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStartDate: (newValue: Date | null) => void;
  optionsService: string[];
}

export default function InvoiceTableToolbar({
  optionsService,
  filterStartDate,
  filterEndDate,
  filterName,
  filterService,
  onFilterName,
  onFilterService,
  onFilterStartDate,
  onFilterEndDate,
}: InvoiceTableToolbarProps) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Service type"
        value={filterService}
        onChange={onFilterService}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: 'capitalize',
        }}
      >
        {optionsService.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label="Start date"
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <DatePicker
        label="End date"
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search client or invoice number..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
