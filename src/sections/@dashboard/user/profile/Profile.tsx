import { Grid, Stack } from '@mui/material';

import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileSocialInfo from './ProfileSocialInfo';

interface ProfileProps {
  myProfile: any;
  posts: any[];
}

export default function Profile({ myProfile, posts }: ProfileProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
