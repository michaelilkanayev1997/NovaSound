import AppLink from '@ui/AppLink';
import AppModal from '@ui/AppModal';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'src/store/player';
import formatDuration from 'format-duration';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const fromattedDuration = (duration = 0) => {
  return formatDuration(duration, {
    leading: true,
  });
};

const AudioPlayer: FC<Props> = ({visible, onRequestClose}) => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/no-poster.webp');

  const {duration, position} = useProgress();

  return (
    <AppModal animation visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>

          <AppLink title={onGoingAudio?.owner.name || ''} />

          <View style={styles.durationContainer}>
            <Text style={styles.duration}>
              {fromattedDuration(position * 1000)}
            </Text>
            <Text style={styles.duration}>
              {fromattedDuration(duration * 1000)}
            </Text>
          </View>
        </View>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.CONTRAST,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  duration: {
    color: colors.CONTRAST,
  },
});

export default AudioPlayer;
