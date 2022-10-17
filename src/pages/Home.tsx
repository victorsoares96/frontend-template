import { styled } from '@mui/material/styles';

import Page from '../components/Page';
import {
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeColorPresets,
  HomeDarkMode,
  HomeHero,
  HomeHugePackElements,
  HomeLookingFor,
  HomeMinimal,
  HomePricingPlans,
} from '../sections/home';

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

export default function HomePage() {
  return (
    <Page title="The starting point for your next project">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomeMinimal />

          <HomeHugePackElements />

          <HomeDarkMode />

          <HomeColorPresets />

          <HomeCleanInterfaces />

          <HomePricingPlans />

          <HomeLookingFor />

          <HomeAdvertisement />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
