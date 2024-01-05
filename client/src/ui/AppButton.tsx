import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, Vibration} from 'react-native';
import Loader from './Loader';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
}

const AppButton: FC<Props> = ({title, busy, onPress}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    // Vibrate for 50ms when the link is pressed
    Vibration.vibrate(50);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <LinearGradient
      colors={
        isPressed
          ? ['#345678', '#6789ab', '#4c669f']
          : ['#4c669f', '#3b5998', '#192f6a']
      }
      style={styles.linearGradient}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container]}>
        {!busy ? <Text style={styles.title}>{title}</Text> : <Loader />}
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    color: colors.INACTIVE_CONTRAST,
    fontSize: 18,
  },
  linearGradient: {
    borderRadius: 25,
  },
});

export default AppButton;
