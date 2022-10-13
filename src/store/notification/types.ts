import type { OptionsObject, SnackbarMessage } from 'notistack';

export type Notification = {
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed: boolean;
};

export type InitialState = {
  notifications: Notification[];
};
