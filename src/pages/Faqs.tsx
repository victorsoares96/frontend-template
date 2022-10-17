import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Page from '../components/Page';
import { FaqsCategory, FaqsForm, FaqsHero, FaqsList } from '../sections/faqs';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function Faqs() {
  return (
    <Page title="Faqs">
      <RootStyle>
        <FaqsHero />

        <Container sx={{ mt: 15, mb: 10, position: 'relative' }}>
          <FaqsCategory />

          <Typography variant="h3" sx={{ mb: 5 }}>
            Frequently asked questions
          </Typography>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <FaqsList />
            </Grid>
            <Grid item xs={12} md={6}>
              <FaqsForm />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
