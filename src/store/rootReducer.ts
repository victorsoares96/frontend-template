/* eslint-disable import/order */


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

export { rootPersistConfig, rootReducer };
