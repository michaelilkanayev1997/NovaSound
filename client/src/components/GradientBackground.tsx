import React, {ReactNode} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBackgroundProps {
  children: ReactNode; // Accepts any kind of children
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({children}) => {
  return (
    <LinearGradient
      colors={['#C5D4E8', '#A9CCE3', '#192f6a']}
      style={styles.container}>
      <ImageBackground
        source={require('../assets/flag.webp')}
        resizeMode="contain"
        style={{flex: 1}}
        imageStyle={{opacity: 0.08, top: '-35%'}}>
        <View style={styles.childContainer}>{children}</View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
  },
});

export default GradientBackground;
