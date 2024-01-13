import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';
import PlayAnimation from './PlayAnimation';

interface Props {
  title: string;
  poster?: string;
  isPlaying?: boolean;
  onPress?(): void;
}

const RecentlyPlayedCard: FC<Props> = ({
  title,
  poster,
  isPlaying = false,
  onPress,
}) => {
  const source = poster ? {uri: poster} : require('../assets/no-poster.webp');
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Image source={source} style={styles.poster} />
        <PlayAnimation visible={isPlaying} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_DARK1,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: 50,
    height: 50,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
});

export default RecentlyPlayedCard;
