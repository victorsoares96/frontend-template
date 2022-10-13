/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';
import { SnackbarKey } from 'notistack';

import isMobile from '@/utils/is-mobile';

import type { AppThunk } from '..';
import type { InitialState, Notification } from './types';

const notificationsDefault: Notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 6000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const initialState: InitialState = {
  notifications: [],
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setNotification: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
  },
});

export const enqueueSnackbar =
  (notification: Partial<Notification>): AppThunk<SnackbarKey> =>
  (dispatch) => {
    const id = Math.random().toString();

    const newNotification: Notification = {
      ...notification,
      message: notification.message,
      dismissed: false,
      options: {
        ...notificationsDefault.options,
        ...notification.options,
        key: id,
      },
    };

    dispatch(setNotification(newNotification));

    return id;
  };

export const closeSnackbar =
  (key: SnackbarKey, dismissAll = !key): AppThunk =>
  (dispatch, getState) => {
    const { notifications } = getState().notification;

    const newNotifications = notifications.map((notification) =>
      dismissAll || notification.options.key === key
        ? { ...notification, dismissed: true }
        : { ...notification },
    );

    dispatch(setNotifications(newNotifications));
  };

export const removeSnackbar =
  (key: SnackbarKey): AppThunk =>
  (dispatch, getState) => {
    const { notifications } = getState().notification;

    const newNotifications = notifications.filter(
      (notification) => notification.options.key !== key,
    );

    dispatch(setNotifications(newNotifications));
  };

export const { setNotification, setNotifications } = slice.actions;

export default slice.reducer;
