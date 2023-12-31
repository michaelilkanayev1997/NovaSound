import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import {FC, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';
import GlobalLoading from '../../components/GlobalLoading';
import GradientBackground from '@components/GradientBackground';
import {updateLoggedInState, updateProfile} from 'src/store/auth';
import {useDispatch} from 'react-redux';
import {Keys, saveToAsyncStorage} from '@utils/asyncStorage';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';

const signinSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .required('Password is required!'),
});

interface Props {
  navigation: any;
}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    try {
      actions.setSubmitting(true); // Activate busy for loader

      const {data} = await client.post('/auth/sign-in', {
        ...values,
      });

      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);

      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }

    actions.setSubmitting(false); // Deactivate busy for loader
  };

  // Splash screen Timer on Start Up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer); // Clear the timeout on unmounting
  }, []);

  return (
    <GradientBackground>
      <>
        {isLoading ? (
          <GlobalLoading />
        ) : (
          <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={signinSchema}>
            <AuthFormContainer heading="Welcome back.">
              <View style={styles.formContainer}>
                <ImageBackground
                  source={require('../../assets/datelogo.png')}
                  resizeMode="center"
                  style={{
                    flex: 1,
                  }}
                  imageStyle={{
                    opacity: 0.99,
                    top: '-35%',
                    height: '10%',
                  }}>
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
                    rightIcon={
                      <PasswordVisibilityIcon privateIcon={secureEntry} />
                    }
                    onRightIconPress={togglePasswordView}
                  />
                  <SubmitBtn title="Sign in" />

                  <View style={styles.linkContainer}>
                    <AppLink
                      title="Forgot Password"
                      onPress={() => {
                        navigation.navigate('LostPassword');
                      }}
                    />
                    <AppLink
                      title="Sign Up"
                      onPress={() => {
                        navigation.navigate('SignUp');
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </AuthFormContainer>
          </Form>
        )}
      </>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.55,
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

export default SignIn;
