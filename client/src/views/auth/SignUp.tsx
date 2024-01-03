import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="Name"
          label="Enter Your Name"
          containerStyle={styles.marginBottom}
          onChange={text => setUserInfo({...userInfo, name: text})}
        />
        <AuthInputField
          placeholder="Email"
          label="Enter Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.marginBottom}
          onChange={text => setUserInfo({...userInfo, email: text})}
        />
        <AuthInputField
          placeholder="Password"
          label="Enter Your Password"
          autoCapitalize="none"
          secureTextEntry
          onChange={text => setUserInfo({...userInfo, password: text})}
        />
        <Button onPress={() => console.log(userInfo)} title="Sign up" />
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
