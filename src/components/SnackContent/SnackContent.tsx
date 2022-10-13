import { Alert, AlertTitle } from '@mui/material';

import { Props } from './types';

const snackContent = ({ severity = 'info', title, content }: Props) => (
  <Alert severity={severity}>
    <AlertTitle>{title}</AlertTitle>
    {content}
  </Alert>
);

export default snackContent;
