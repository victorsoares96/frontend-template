import { TableCell, TableRow } from '@mui/material';

interface Props {
  emptyRows: number;
  height: number;
}

export default function TableEmptyRows({ emptyRows, height }: Props) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
