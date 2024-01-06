import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';
import {FormikHelpers} from 'formik';
import GradientBackground from '@components/GradientBackground';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {useDispatch} from 'react-redux';

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
});

interface Props {}

interface InitialValue {
  email: string;
}

const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: InitialValue,
    actions: FormikHelpers<InitialValue>,
  ) => {
    try {
      actions.setSubmitting(true); // Activate busy for loader

      const {data} = await client.post('/auth/forget-password', {
        ...values,
      });

      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }

    actions.setSubmitting(false); // Deactivate busy for loader
  };

  return (
    <GradientBackground>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={lostPasswordSchema}>
        <AuthFormContainer heading="Forget Password!">
          <View style={styles.formContainer}>
            <AuthInputField
              name="email"
              placeholder="Enter"
              label="Enter Your Email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.marginBottom}
            />

            <SubmitBtn title="Send link" />

            <View style={styles.linkContainer}>
              <AppLink
                title="Sign in"
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              />
              <AppLink
                title="Sign Up"
                onPress={() => {
                  navigation.navigate('SignUp');
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

export default LostPassword;
