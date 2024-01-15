import AppModal from '@ui/AppModal';
import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import colors from '@utils/colors';
import {FC} from 'react';
import {Text} from 'react-native';
import {View, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFetchPlaylistAudios} from 'src/hooks/query';
import {
  getPlaylistModalState,
  updatePlaylistVisbility,
} from 'src/store/playlistModal';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const {visible, selectedListId} = useSelector(getPlaylistModalState);
  const dispatch = useDispatch();
  const {data, isLoading} = useFetchPlaylistAudios(selectedListId || '');

  const handleClose = () => {
    dispatch(updatePlaylistVisbility(false));
  };

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      {isLoading ? (
        <View style={styles.container}>
          <AudioListLoadingUI />
        </View>
      ) : (
        <>
          <Text style={styles.title}>{data?.title}</Text>
          <FlatList
            contentContainerStyle={styles.container}
            data={data?.audios}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return <AudioListItem audio={item} />;
            }}
          />
        </>
      )}
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});

export default PlaylistAudioModal;
