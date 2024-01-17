import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

interface Props {
  icon?: ReactNode;
  label: string;
  onPress?(): void;
}

const OptionSelector: FC<Props> = ({label, icon, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.optionContainer}>
      {icon}
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default OptionSelector;
