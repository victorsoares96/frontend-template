import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

import { PATH_DASHBOARD } from '../routes/paths';

interface Props {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return children;
}
