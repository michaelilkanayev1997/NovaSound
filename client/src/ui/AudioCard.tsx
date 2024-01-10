import colors from '@utils/colors';
import {FC} from 'react';
import {
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import PlayAnimation from './PlayAnimation';

interface Props {
  title: string;
  poster?: string;
  playing?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
  onLongPress?(): void;
}

const AudioCard: FC<Props> = ({
  title,
  playing = false,
  poster,
  containerStyle,
  onPress,
  onLongPress,
}) => {
  const source = poster
    ? {uri: poster}
    : require('../assets/no-poster-300x300.webp');

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, containerStyle]}>
      <View>
        <Image source={source} style={styles.poster} resizeMode="contain" />
        <PlayAnimation visible={playing} />
      </View>

      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {width: 100, marginRight: 15},
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});

export default AudioCard;
