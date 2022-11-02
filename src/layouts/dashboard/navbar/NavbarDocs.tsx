import { Button, Stack, Typography } from '@mui/material';

import { DocIllustration } from '../../../assets';
import { PATH_DOCS } from '../../../routes/paths';

export default function NavbarDocs() {
  const user = {
    displayName: 'Katarina Smith',
  };

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Need help?
          <br /> Please check our docs
        </Typography>
      </div>

      <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
        Documentation
      </Button>
    </Stack>
  );
}
