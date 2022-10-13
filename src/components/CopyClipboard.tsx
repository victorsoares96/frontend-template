import { ChangeEvent, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';

import { useSnackbar } from 'notistack';

import Iconify from './Iconify';

interface Props {
  value: string;
}

export default function CopyClipboard({ value, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    value,
    copied: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({ value: event.target.value, copied: false });
  };

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar('Copied!');
    }
  };

  return (
    <TextField
      fullWidth
      value={state.value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CopyToClipboard text={state.value} onCopy={onCopy}>
              <Tooltip title="Copy">
                <IconButton>
                  <Iconify icon="eva:copy-fill" width={24} height={24} />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
}
