import EmptyRecords from '@ui/EmptyRecords';
import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Playlist} from 'src/@types/audio';
import {useFetchPlaylist} from 'src/hooks/query';
import {
  updateIsPlaylistPrivate,
  updatePlaylistVisbility,
  updateSelectedListId,
} from 'src/store/playlistModal';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPlaylist();
  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateIsPlaylistPrivate(playlist.visibility === 'private'));
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisbility(true));
  };

  return (
    <ScrollView style={styles.container}>
      {!data?.length ? <EmptyRecords title="There is no Playlist." /> : null}
      {data?.map(playlist => {
        return (
          <PlaylistItem
            onPress={() => handleOnListPress(playlist)}
            key={playlist.id}
            playlist={playlist}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
