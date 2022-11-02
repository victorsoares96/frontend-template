import { ClickAwayListener, InputAdornment } from '@mui/material';

import Iconify from '@/components/Iconify';
import InputStyle from '@/components/InputStyle';

interface ChatContactSearchProps {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClickAway: (event: MouseEvent | TouchEvent) => void;
}

export default function ChatContactSearch({
  query,
  onChange,
  onFocus,
  onClickAway,
}: ChatContactSearchProps) {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <InputStyle
        fullWidth
        size="small"
        value={query}
        onFocus={onFocus}
        onChange={onChange}
        placeholder="Search contacts..."
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
        sx={{ mt: 2 }}
      />
    </ClickAwayListener>
  );
}
