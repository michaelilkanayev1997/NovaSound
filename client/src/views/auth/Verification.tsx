import {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  ProfileNavigatorStackParamList,
} from 'src/@types/navigation';
import client from 'src/api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import colors from '@utils/colors';
import GradientBackground from '@components/GradientBackground';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {useDispatch} from 'react-redux';
import ReVerificationLink from '@components/ReVerificationLink';

type Props = NativeStackScreenProps<
  AuthStackParamList | ProfileNavigatorStackParamList,
  'Verification'
>;

type PossibleScreens = {
  ProfileSettings: undefined;
  SignIn: undefined;
};

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const navigation = useNavigation<NavigationProp<PossibleScreens>>();
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const {userInfo} = route.params;

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      // moves to the previews only if the field is empty
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      // update otp and move to the next
      setActiveOtpIndex(index + 1);

      newOtp[index] = value;
    }

    setOtp([...newOtp]);
  };

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) {
      return dispatch(
        updateNotification({message: 'Invalid OTP', type: 'error'}),
      );
    }

    setSubmitting(true);
    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });

      dispatch(updateNotification({message: data.message, type: 'success'}));

      const {routeNames} = navigation.getState();

      if (routeNames.includes('SignIn')) {
        // navigate back to Sign in page
        navigation.navigate('SignIn');
      }

      if (routeNames.includes('ProfileSettings')) {
        // navigate back to ProfileSettings page
        navigation.navigate('ProfileSettings');
      }
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setSubmitting(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <GradientBackground>
      <AuthFormContainer heading="Please look at your email.">
        <View style={styles.inputContainer}>
          {otpFields.map((_, index) => {
            return (
              <OTPField
                ref={activeOtpIndex === index ? inputRef : null}
                key={index}
                placeholder="*"
                onKeyPress={({nativeEvent}) => {
                  handleChange(nativeEvent.key, index);
                }}
                keyboardType="numeric"
                maxLength={1}
              />
            );
          })}
        </View>

        <View style={{width: '25%'}}>
          <AppButton
            busy={submitting}
            title="Submit"
            onPress={handleSubmit}
            borderRadius={10}
          />
        </View>

        <View style={styles.linkContainer}>
          <ReVerificationLink linkTitle="Re-send OTP" userId={userInfo.id} />
        </View>
      </AuthFormContainer>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flex: 0.3,
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 10,
  },
});

export default Verification;
