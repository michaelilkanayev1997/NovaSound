import {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {}

const GlobalLoading: FC<Props> = props => {
  return (
    <LinearGradient colors={['#C5D4E8', '#A9CCE3', '#192f6a']}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  animationWrapper: {
    width: '100%',
    height: '100%',
    padding: 7,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: 350,
  },
});

export default GlobalLoading;
