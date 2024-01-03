import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import {Formik} from 'formik';
import {FC, useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={initialValues}
        // validationSchema={}
      >
        {({handleSubmit, handleChange, values}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                placeholder="John Doe"
                label="Name"
                containerStyle={styles.marginBottom}
                onChange={handleChange('name')}
                value={values.name}
              />
              <AuthInputField
                placeholder="john@email.com"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.marginBottom}
                onChange={handleChange('email')}
                value={values.email}
              />
              <AuthInputField
                placeholder="********"
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange('password')}
                value={values.password}
              />
              <Button
                onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                title="Sign up"
              />
            </View>
          );
        }}
      </Formik>
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
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUp;
