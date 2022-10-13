/* eslint-disable import/order */
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { mainApi } from '@/api/main/main.api';
import hotkeysSlice from '@/store/hotkeys/hotkeys.slice';
import sessionSlice from '@/store/session/session.slice';
import sidebarSlice from '@/store/sidebar/sidebar.slice';

import notificationSlice from './notification/notification.slice';
import settingsSlice from './settings/settings.slice';
import calendarReducer from './slices/calendar';
import chatReducer from './slices/chat';
import kanbanReducer from './slices/kanban';
import mailReducer from './slices/mail';
import productReducer from './slices/product';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  session: sessionSlice,
  hotkeys: hotkeysSlice,
  settings: settingsSlice,
  sidebar: sidebarSlice,
  notification: notificationSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(mainApi.middleware),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
