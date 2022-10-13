import React from 'react';

import { TableCell, TableRow } from '@mui/material';

import EmptyContent from '../EmptyContent';

interface Props {
  isNotFound?: boolean;
}

export default function TableNoData({ isNotFound }: Props) {
  if (isNotFound) {
    return (
      <TableRow>
        <TableCell colSpan={9}>
          <EmptyContent
            title="No Data"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      </TableRow>
    );
  }
  return (
    <TableRow>
      <TableCell colSpan={9} sx={{ p: 0 }} />
    </TableRow>
  );
}

TableNoData.defaultProps = {
  isNotFound: false,
};
