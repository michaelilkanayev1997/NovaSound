import colors from '@utils/colors';
import {FC} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
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
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15, // padding in the x direction
  },
});

export default SignUp;
