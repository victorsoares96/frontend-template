import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default Loading;
