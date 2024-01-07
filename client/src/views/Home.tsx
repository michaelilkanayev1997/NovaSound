import LatestUploads from '@components/LatestUploads';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {}

const Home: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <LatestUploads />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Home;
