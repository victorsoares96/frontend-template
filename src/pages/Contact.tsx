import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import Page from '../components/Page';
import { ContactForm, ContactHero, ContactMap } from '../sections/contact';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function Contact() {
  return (
    <Page title="Contact us">
      <RootStyle>
        <ContactHero />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <ContactForm />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContactMap />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
