import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Playlist} from 'src/@types/audio';
import {PublicProfileTabParamsList} from 'src/@types/navigation';
import {useFetchPublicPlaylist} from 'src/hooks/query';
import {
  updateAllowPlaylistAudioRemove,
  updateIsPlaylistPrivate,
  updatePlaylistVisbility,
  updateSelectedListId,
} from 'src/store/playlistModal';

type Props = NativeStackScreenProps<
  PublicProfileTabParamsList,
  'PublicPlaylist'
>;

const PublicPlaylistTab: FC<Props> = props => {
  const {data} = useFetchPublicPlaylist(props.route.params.profileId);
  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateAllowPlaylistAudioRemove(false));
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisbility(true));
    dispatch(updateIsPlaylistPrivate(playlist.visibility === 'private'));
  };

  return (
    <ScrollView style={styles.container}>
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

export default PublicPlaylistTab;
