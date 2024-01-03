import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import {FC} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="Name"
          label="Enter Your Name"
          containerStyle={styles.marginBottom}
        />
        <AuthInputField
          placeholder="Email"
          label="Enter Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.marginBottom}
        />
        <AuthInputField
          placeholder="Password"
          label="Enter Your Password"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15, // padding in the x direction
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUp;
