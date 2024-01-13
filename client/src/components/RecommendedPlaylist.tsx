import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFetchRecommendedPlaylist} from 'src/hooks/query';

interface Props {}

const RecommendedPlaylist: FC<Props> = props => {
  const {data} = useFetchRecommendedPlaylist();

  console.log(data);
  return (
    <View style={styles.container}>
      {data?.map(item => {
        return (
          <View key={item.id}>
            <Text>{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RecommendedPlaylist;
