import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';

interface Props {}

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = props => {
  return (
    <AuthFormContainer heading="Please look at your email.">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return <OTPField key={index} placeholder="x" />;
        })}
      </View>

      <AppButton title="Submit" />

      <View style={styles.linkContainer}>
        <AppLink title="Re-send OTP" />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flex: 0.3,
  },
});

export default Verification;
