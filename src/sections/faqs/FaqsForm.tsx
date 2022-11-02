import { Button, Stack, TextField, Typography } from '@mui/material';

import { m } from 'framer-motion';

import { MotionViewport, varFade } from '@/components/animate';

export default function FaqsForm() {
  return (
    <Stack component={MotionViewport} spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h4">Haven&apos;t found the right help?</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Name" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Email" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Subject" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Enter your message here." multiline rows={4} />
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </m.div>
    </Stack>
  );
}
