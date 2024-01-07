import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {usefetchRecommendedAudios} from 'src/hooks/query';

interface Props {}

const RecommendedAudios: FC<Props> = props => {
  const {data, isLoading} = usefetchRecommendedAudios();

  console.log(data);
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default RecommendedAudios;
