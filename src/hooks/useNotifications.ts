import { useCallback, useMemo } from 'react';

import { SnackbarKey } from 'notistack';

import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
  removeSnackbar as removeSnackbarAction,
} from '@/store/notification/notification.slice';
import { Notification } from '@/store/notification/types';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export function useNotifications() {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector((state) => state.notification.notifications);

  const enqueueSnackbar = useCallback(
    (notification: Partial<Notification>) => dispatch(enqueueSnackbarAction(notification)),
    [dispatch],
  );
  const closeSnackbar = useCallback(
    (key: SnackbarKey, dismissAll = !key) => dispatch(closeSnackbarAction(key, dismissAll)),
    [dispatch],
  );
  const removeSnackbar = useCallback(
    (key: SnackbarKey) => dispatch(removeSnackbarAction(key)),
    [dispatch],
  );

  const actions = useMemo(
    () => ({ enqueueSnackbar, closeSnackbar, removeSnackbar }),
    [enqueueSnackbar, closeSnackbar, removeSnackbar],
  );
  return { notifications, ...actions };
}
