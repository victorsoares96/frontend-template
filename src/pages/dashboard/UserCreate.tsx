import { useLocation, useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { capitalCase, paramCase } from 'change-case';

import { _userList } from '@/_mock';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import Page from '@/components/Page';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@/routes/paths';
import UserNewEditForm from '@/sections/@dashboard/user/UserNewEditForm';

export default function UserCreate() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="User: Create a new user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase(name) },
          ]}
        />

        <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
