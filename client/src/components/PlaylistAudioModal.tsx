import AppModal from '@ui/AppModal';
import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ListRenderItem,
  Animated,
} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {useMutation, QueryClient, useQueryClient} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {AudioData, CompletePlaylist} from 'src/@types/audio';
import {getClient} from 'src/api/client';
import {useFetchPlaylistAudios} from 'src/hooks/query';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';
import {
  getPlaylistModalState,
  updatePlaylistVisbility,
} from 'src/store/playlistModal';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const {visible, selectedListId, isPrivate} = useSelector(
    getPlaylistModalState,
  );
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const dispatch = useDispatch();
  const {data, isLoading} = useFetchPlaylistAudios(
    selectedListId || '',
    isPrivate || false,
  );

  const queryClient = useQueryClient();
  const [removing, setRemoving] = useState(false);

  const removeAudioFromPlaylist = async (id: string, playlistId: string) => {
    const client = await getClient();
    client.delete(`/playlist?playlistId=${playlistId}&resId=${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: async ({id, playlistId}) =>
      removeAudioFromPlaylist(id, playlistId),
    onMutate: (variable: {id: string; playlistId: string}) => {
      queryClient.setQueryData<CompletePlaylist>(
        ['playlist-audios', selectedListId],
        oldData => {
          let finalData: CompletePlaylist = {title: '', id: '', audios: []};

          if (!oldData) return finalData;

          const audios = oldData?.audios.filter(
            item => item.id !== variable.id,
          );

          return {...oldData, audios};
        },
      );
    },
  });

  const handleClose = () => {
    dispatch(updatePlaylistVisbility(false));
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.swipeableContainer}>
        <Animated.View style={{transform: [{scale}]}}>
          <Text style={{color: colors.CONTRAST}}>
            {removing ? 'Removing...' : 'Removed'}
          </Text>
        </Animated.View>
      </View>
    );
  };

  const renderItem: ListRenderItem<AudioData> = ({item}) => {
    return (
      <Swipeable
        onSwipeableOpen={() => {
          deleteMutation.mutate({
            id: item.id,
            playlistId: selectedListId || '',
          });
          setRemoving(false);
        }}
        onSwipeableWillOpen={() => {
          setRemoving(true);
        }}
        renderRightActions={renderRightActions}>
        <RectButton onPress={() => onAudioPress(item, data?.audios || [])}>
          <AudioListItem
            onPress={() => onAudioPress(item, data?.audios || [])}
            audio={item}
            isPlaying={onGoingAudio?.id === item.id}
          />
        </RectButton>
      </Swipeable>
    );
  };

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      <View style={styles.container}>
        {isLoading ? (
          <AudioListLoadingUI />
        ) : (
          <>
            <Text style={styles.title}>{data?.title}</Text>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={data?.audios}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              ListEmptyComponent={<EmptyRecords title="No audios!" />}
            />
          </>
        )}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flatlist: {
    paddingBottom: 50,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
  swipeableContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default PlaylistAudioModal;
