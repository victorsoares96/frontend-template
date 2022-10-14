import { Alert, AlertTitle, Container } from '@mui/material';

type Role = 'admin' | 'leader';

interface Props {
  accessibleRoles: Array<Role>;
  children: React.ReactNode;
}

const useCurrentRole = () => {
  // Logic here to get current user role
  const role: Role = 'admin';
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }: Props) {
  const currentRole = useCurrentRole();

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return children;
}
