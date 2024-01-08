import LatestUploads from '@components/LatestUploads';
import OptionsModal from '@components/OptionsModal';
import RecommendedAudios from '@components/RecommendedAudios';
import {FC, useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@utils/colors';
import {AudioData} from 'src/@types/audio';
import client from 'src/api/client';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {updateNotification} from 'src/store/notification';
import catchAsyncError from 'src/api/catchError';
import {useDispatch} from 'react-redux';
import PlaylistForm, {PlaylistInfo} from '@components/PlaylistForm';
import PlayListModal from '@components/PlaylistModal';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;
    // send request with the audio id that we want to add fav

    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

      const {data} = await client.post(
        '/favorite?audioId=' + selectedAudio.id,
        null,
        {
          headers: {Authorization: 'Bearer ' + token},
        },
      );
      dispatch(
        updateNotification({
          message:
            data.status === 'added'
              ? 'Added To Favorites'
              : 'Removed From Favorites',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnAddToPlaylist = () => {
    setShowOptions(false);
    setShowPlaylistModal(true);
  };

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;

    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

      const {data} = await client.post(
        '/playlist/create',
        {
          resId: selectedAudio?.id,
          title: value.title,
          visibility: value.private ? 'private' : 'public',
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
  };

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Add to playlist',
            icon: 'playlist-music',
            onPress: handleOnAddToPlaylist,
          },
          {
            title: 'Add to favorites',
            icon: 'cards-heart',
            onPress: handleOnFavPress,
          },
        ]}
        renderItem={item => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <MaterialComIcon
                size={24}
                color={colors.PRIMARY}
                name={item.icon}
              />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />

      <PlayListModal
        visible={showPlaylistModal}
        onRequestClose={() => {
          setShowPlaylistModal(false);
        }}
        list={[]}
        onCreateNewPress={() => {
          setShowPlaylistModal(false);
          setShowPlaylistForm(true);
        }}
      />

      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setShowPlaylistForm(false);
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default Home;
