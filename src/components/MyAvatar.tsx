import { AvatarProps } from '@mui/material';

import createAvatar from '../utils/createAvatar';
import Avatar from './Avatar';

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = {
    photoURL: 'https://github.com/victorsoares96.png',
    displayName: 'Victor Soares',
  };
  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
