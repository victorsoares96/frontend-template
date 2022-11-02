import { Container } from '@mui/material';

import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import Page from '@/components/Page';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@/routes/paths';
import { BlogNewPostForm } from '@/sections/@dashboard/blog';

export default function BlogNewPost() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' },
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
