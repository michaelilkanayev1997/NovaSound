import {useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import colors from '@utils/colors';

interface Props {
  title: string;
  onPress?(): void;
}

const AppLink: React.FC<Props> = ({title, onPress}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Text style={[styles.title, isPressed && styles.titlePressed]}>
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
