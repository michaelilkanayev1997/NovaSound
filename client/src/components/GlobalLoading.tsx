import {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '@utils/colors';

interface Props {}

const GlobalLoading: FC<Props> = props => {
  return (
    <View style={styles.cover}>
      <View style={styles.animationWrapper}>
        <LottieView
          style={{flex: 1}}
          key="animation"
          autoPlay
          loop
          resizeMode="contain"
          speed={0.5}
          source={require('../assets/SplashAnimation.json')}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationWrapper: {
    width: '100%',
    height: '100%',
    padding: 7,
  },
  cover: {
    backgroundColor: colors.PRIMARY,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: 350, // Use a percentage of the screen width
  },
});

export default GlobalLoading;
