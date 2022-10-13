import { AlertColor } from '@mui/material';

export interface Props {
  severity?: AlertColor;
  title: string;
  content: string | React.ReactNode;
}
