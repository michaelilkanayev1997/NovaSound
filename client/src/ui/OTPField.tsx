import colors from '@utils/colors';
import {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  ref: any;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => {
  return <TextInput {...props} ref={ref} style={[styles.input, props.style]} />;
});

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: colors.SECONDARY,
    borderWidth: 3,
    textAlign: 'center',
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});

export default OTPField;
