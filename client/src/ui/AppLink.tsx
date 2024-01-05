import {useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import colors from '@utils/colors';

interface Props {
  title: string;
  onPress?(): void;
  active?: boolean;
}

const AppLink: React.FC<Props> = ({title, active = true, onPress}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={active ? onPress : null}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{opacity: active ? 1 : 0.4}}>
      <Text style={[styles.title, active && isPressed && styles.titlePressed]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.SECONDARY,
  },
  titlePressed: {
    color: colors.OVERLAY,
    textDecorationLine: 'underline',
  },
});

export default AppLink;
