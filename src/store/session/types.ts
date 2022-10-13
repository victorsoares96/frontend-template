export type InitialSessionState = {
  user: User | null;
  token: string | null;
  authenticated: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export type Session = {
  token: string;
  user: User;
};
