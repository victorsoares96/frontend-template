import React from 'react';

import { Grid, Typography } from '@mui/material';

import BlogPostCard from './BlogPostCard';

interface BlogPostRecentProps {
  posts: any[];
}

export default function BlogPostRecent({ posts }: BlogPostRecentProps) {
  return (
    <React.Fragment>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <Grid key={post.id} item xs={12} sm={6} md={3}>
            <BlogPostCard index={index} post={post} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
