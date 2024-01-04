import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.titleContainer}>
        {heading ? <Text style={styles.heading}>{heading}</Text> : null}
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {
    color: colors.SECONDARY,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    height: 50,
    width: screenWidth * 0.9, // Use a percentage of the screen width
  },
  titleContainer: {
    flex: 0.15,
  },
});

export default AuthFormContainer;
