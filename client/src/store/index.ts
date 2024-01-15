import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification';
import playerReducer from './player';
import platlistModalReducer from './playlistModal';

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  player: playerReducer,
  playlistModal: platlistModalReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
