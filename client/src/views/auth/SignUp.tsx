import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';

const {width: screenWidth} = Dimensions.get('window');

const signupSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing!')
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!',
    )
    .required('Password is required!'),
});

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text
          style={{
            color: colors.SECONDARY,
            fontSize: 16,
            fontWeight: 'bold',
            paddingVertical: 15,
          }}>
          Let's get started by creating your account.
        </Text>
      </View>
      <Form
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={initialValues}
        validationSchema={signupSchema}>
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Name"
            label="Enter Your Name"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="email"
            placeholder="Enter"
            label="Enter Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="Password"
            label="Enter Your Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />
          <SubmitBtn title="Sign up" />

          <View style={styles.linkContainer}>
            <AppLink title="Forgot Password" />
            <AppLink title="Sign In" />
          </View>
        </View>
      </Form>
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
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: screenWidth * 0.9, // Use a percentage of the screen width
  },
  formContainer: {
    flex: 0.7,
    width: '100%',
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 8,
  },
});

export default SignUp;
