import { MenuItem, TextField } from '@mui/material';

interface BlogPostsSortProps {
  query: string;
  options: {
    value: string;
    label: string;
  }[];
  onSort: (value: string) => void;
}

export default function BlogPostsSort({ query, options, onSort }: BlogPostsSortProps) {
  return (
    <TextField select size="small" value={query} onChange={(e) => onSort(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
