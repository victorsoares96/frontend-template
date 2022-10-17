import { useEffect } from 'react';

import { Card, Container } from '@mui/material';

import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import Page from '@/components/Page';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@/routes/paths';
import { ChatSidebar, ChatWindow } from '@/sections/@dashboard/chat';
import { getContacts, getConversations } from '@/store/slices/chat';

export default function Chat() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Chat"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Chat' }]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
