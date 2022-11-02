import { useState } from 'react';

import { Box, Card, Container, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

import { capitalCase } from 'change-case';

import { _userAbout, _userFeeds, _userFollowers, _userFriends, _userGallery } from '@/_mock';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import Iconify from '@/components/Iconify';
import Page from '@/components/Page';
import { useAppSelector } from '@/hooks/useAppSelector';
import useAuth from '@/hooks/useAuth';
import useTabs from '@/hooks/useTabs';
import { PATH_DASHBOARD } from '@/routes/paths';
import {
  Profile,
  ProfileCover,
  ProfileFollowers,
  ProfileFriends,
  ProfileGallery,
} from '@/sections/@dashboard/user/profile';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

export default function UserProfile() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('profile');

  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value: string) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon="ic:round-account-box" width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'followers',
      icon: <Iconify icon="eva:heart-fill" width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'friends',
      icon: <Iconify icon="eva:people-fill" width={20} height={20} />,
      component: (
        <ProfileFriends
          friends={_userFriends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      ),
    },
    {
      value: 'gallery',
      icon: <Iconify icon="ic:round-perm-media" width={20} height={20} />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_userAbout} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
