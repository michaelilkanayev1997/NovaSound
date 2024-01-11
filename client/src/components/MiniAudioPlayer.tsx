import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'src/store/player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlayPauseBtn from '@ui/PlayPauseBtn';
import useAudioController from 'src/hooks/useAudioController';
import Loader from '@ui/Loader';
import {mapRange} from '@utils/math';
import {useProgress} from 'react-native-track-player';

interface Props {}

const MiniPlayerHeight = 60;

const MiniAudioPlayer: FC<Props> = props => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isPlaying, isBusy, togglePlayPause} = useAudioController();
  const progress = useProgress();

  const poster = onGoingAudio?.poster;

  const source = poster
    ? {uri: poster}
    : require('../assets/no-poster-300x300.webp');

  return (
    <>
      <View
        style={{
          height: 2,
          backgroundColor: colors.SECONDARY,
          width: `${mapRange({
            outputMin: 0,
            outputMax: 100,
            inputMin: 0,
            inputMax: progress.duration,
            inputValue: progress.position,
          })}%`,
        }}
      />
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>
          <Text style={styles.name}>{onGoingAudio?.owner.name}</Text>
        </View>

        <Pressable style={{paddingHorizontal: 10}}>
          <AntDesign name="hearto" size={24} color={colors.CONTRAST} />
        </Pressable>

        {isBusy ? (
          <Loader blackLoading loaderStyle={{width: 30, height: 30}} />
        ) : (
          <PlayPauseBtn playing={isPlaying} onPress={togglePlayPause} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: MiniPlayerHeight,
    backgroundColor: colors.PRIMARY_DARK1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  poster: {
    height: MiniPlayerHeight - 10,
    width: MiniPlayerHeight - 10,
    borderRadius: 5,
  },
  title: {
    color: colors.SECONDARY,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  name: {
    color: colors.Info,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
});

export default MiniAudioPlayer;
