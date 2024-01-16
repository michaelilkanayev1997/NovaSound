import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';

interface PlaylistModal {
  visible: boolean;
  selectedListId?: string;
  isPrivate?: boolean;
}

const initialState: PlaylistModal = {
  visible: false,
};

const slice = createSlice({
  name: 'playlistModal',
  initialState,
  reducers: {
    updatePlaylistVisbility(playerState, {payload}: PayloadAction<boolean>) {
      playerState.visible = payload;
    },
    updateSelectedListId(playerState, {payload}: PayloadAction<string>) {
      playerState.selectedListId = payload;
    },
    updateIsPlaylistPrivate(playerState, {payload}: PayloadAction<boolean>) {
      playerState.isPrivate = payload;
    },
  },
});

export const getPlaylistModalState = createSelector(
  (state: RootState) => state,
  ({playlistModal}) => playlistModal,
);

export const {
  updatePlaylistVisbility,
  updateSelectedListId,
  updateIsPlaylistPrivate,
} = slice.actions;

export default slice.reducer;
