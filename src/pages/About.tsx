import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import Page from '../components/Page';
import { AboutHero, AboutTeam, AboutTestimonials, AboutVision, AboutWhat } from '../sections/about';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function About() {
  return (
    <Page title="About us">
      <RootStyle>
        <AboutHero />

        <AboutWhat />

        <AboutVision />

        <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

        <AboutTeam />

        <AboutTestimonials />
      </RootStyle>
    </Page>
  );
}
