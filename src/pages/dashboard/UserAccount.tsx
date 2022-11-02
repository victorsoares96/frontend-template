import { Box, Container, Tab, Tabs } from '@mui/material';

import { capitalCase } from 'change-case';

import { _userAbout, _userAddressBook, _userInvoices, _userPayment } from '@/_mock';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import Iconify from '@/components/Iconify';
import Page from '@/components/Page';
import { useAppSelector } from '@/hooks/useAppSelector';
import useTabs from '@/hooks/useTabs';
import { PATH_DASHBOARD } from '@/routes/paths';
import {
  AccountBilling,
  AccountChangePassword,
  AccountGeneral,
  AccountNotifications,
  AccountSocialLinks,
} from '@/sections/@dashboard/user/account';

export default function UserAccount() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);

  const { currentTab, onChangeTab } = useTabs('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon="ic:round-account-box" width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'billing',
      icon: <Iconify icon="ic:round-receipt" width={20} height={20} />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={_userAddressBook}
          invoices={_userInvoices}
        />
      ),
    },
    {
      value: 'notifications',
      icon: <Iconify icon="eva:bell-fill" width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      icon: <Iconify icon="eva:share-fill" width={20} height={20} />,
      component: <AccountSocialLinks myProfile={_userAbout} />,
    },
    {
      value: 'change_password',
      icon: <Iconify icon="ic:round-vpn-key" width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
