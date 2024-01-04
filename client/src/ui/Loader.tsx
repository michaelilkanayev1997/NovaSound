import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {}

const Loader: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <LottieView
        style={{width: 125, height: 125}}
        key="animation"
        autoPlay
        loop
        resizeMode="contain"
        source={require('../assets/Loading.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Loader;
