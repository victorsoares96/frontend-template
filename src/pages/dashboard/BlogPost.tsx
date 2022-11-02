import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Card, Container, Divider, Pagination, Typography } from '@mui/material';

import { sentenceCase } from 'change-case';

import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import Markdown from '@/components/Markdown';
import Page from '@/components/Page';
import { SkeletonPost } from '@/components/skeleton';
import { useAppSelector } from '@/hooks/useAppSelector';
import useIsMountedRef from '@/hooks/useIsMountedRef';
import { PATH_DASHBOARD } from '@/routes/paths';
import {
  BlogPostCommentForm,
  BlogPostCommentList,
  BlogPostHero,
  BlogPostRecent,
  BlogPostTags,
} from '@/sections/@dashboard/blog';
import axios from '@/utils/axios';

export default function BlogPost() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);

  const isMountedRef = useIsMountedRef();

  const { title } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [error, setError] = useState<string | null>(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/post', {
        params: { title },
      });

      if (isMountedRef.current) {
        setPost(response.data.post);
      }
    } catch (err) {
      console.error(err);

      if (err instanceof Error) setError(err.message);
    }
  }, [isMountedRef, title]);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      if (isMountedRef.current) {
        setRecentPosts(response.data.recentPosts);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, title]);

  useEffect(() => {
    getPost();
    getRecentPosts();
  }, [getRecentPosts, getPost]);

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title) },
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box>
          </Card>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}

        <BlogPostRecent posts={recentPosts} />
      </Container>
    </Page>
  );
}
