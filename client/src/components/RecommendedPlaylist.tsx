import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text, Pressable, Image, FlatList} from 'react-native';
import {useFetchRecommendedPlaylist} from 'src/hooks/query';

interface Props {}

const RecommendedPlaylist: FC<Props> = props => {
  const {data} = useFetchRecommendedPlaylist();

  return (
    <View>
      <Text style={styles.header}>Playlist for you</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.container}>
              <Image
                source={require('../assets/no-poster.webp')}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.itemsCount}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const cardSize = 150;

const styles = StyleSheet.create({
  container: {
    width: cardSize,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: cardSize,
    height: cardSize,
  },
  overlay: {
    backgroundColor: colors.OVERLAY,
    ...StyleSheet.absoluteFillObject,
    top: -120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.INACTIVE_CONTRAST,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  header: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default RecommendedPlaylist;
