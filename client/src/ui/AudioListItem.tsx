import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';
import {AudioData} from 'src/@types/audio';
import PlayAnimation from './PlayAnimation';

interface Props {
  audio: AudioData;
  onPress?(): void;
  onLongPress?(): void;
  isPlaying?: boolean;
}

const AudioListItem: FC<Props> = ({
  audio,
  isPlaying = false,
  onPress,
  onLongPress,
}) => {
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/no-poster-small.webp');
  };

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      style={styles.listItem}>
      <View>
        <Image source={getSource(audio.poster)} style={styles.poster} />
        <PlayAnimation visible={isPlaying} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {audio.title}
        </Text>
        <Text style={styles.owner} numberOfLines={1} ellipsizeMode="tail">
          {audio.owner.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY_DARK1,
    marginBottom: 15,
    borderRadius: 5,
    elevation: 10, // Android shadow
    shadowColor: 'black', // iOS shadow
    shadowOpacity: 0.2, // iOS shadow opacity
    shadowRadius: 2, // iOS shadow radius
    shadowOffset: {
      width: 0,
      height: 2,
    }, // iOS shadow offset
    overflow: 'hidden',
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
  poster: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
  },
  owner: {
    color: colors.Info,
    fontWeight: '700',
  },
});

export default AudioListItem;
