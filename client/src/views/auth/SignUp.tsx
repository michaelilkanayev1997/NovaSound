import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';
import GradientBackground from '@components/GradientBackground';

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

interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true); // Activate busy for loader

    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });

      navigation.navigate('Verification', {userInfo: data.user});
    } catch (error) {
      console.log('Sign up error: ', error);
    }

    actions.setSubmitting(false); // Deactivate busy for loader
  };

  return (
    <GradientBackground>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={signupSchema}>
        <AuthFormContainer subHeading="Let's get started by creating your account.">
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
              <AppLink
                title="Forgot Password"
                onPress={() => {
                  navigation.navigate('LostPassword');
                }}
              />
              <AppLink
                title="Sign In"
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              />
            </View>
          </View>
        </AuthFormContainer>
      </Form>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.8,
    width: '100%',
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
