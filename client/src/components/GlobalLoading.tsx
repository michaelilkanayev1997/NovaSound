import {FC} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import GradientBackground from './GradientBackground';

const {width: screenWidth} = Dimensions.get('window');

interface Props {}

const GlobalLoading: FC<Props> = props => {
  return (
    <GradientBackground>
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
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  animationWrapper: {
    width: '100%',
    height: '100%',
    padding: '3%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: screenWidth * 0.95,
  },
});

export default GlobalLoading;
