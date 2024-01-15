import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';

interface PlaylistModal {
  visible: boolean;
  selectedListId?: string;
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
  },
});

export const getPlaylistModalState = createSelector(
  (state: RootState) => state,
  ({playlistModal}) => playlistModal,
);

export const {updatePlaylistVisbility, updateSelectedListId} = slice.actions;

export default slice.reducer;
