import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/Login';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return children;
}
