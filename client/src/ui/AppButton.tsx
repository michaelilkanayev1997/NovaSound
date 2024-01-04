import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Loader from './Loader';

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
}

const AppButton: FC<Props> = ({title, busy, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        {backgroundColor: pressed ? colors.THIRD : colors.SECONDARY},
      ]}>
      {!busy ? <Text style={styles.title}>{title}</Text> : <Loader />}
    </Pressable>
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
});

export default AppButton;
