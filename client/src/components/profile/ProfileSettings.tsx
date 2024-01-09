import AppHeader from '@components/AppHeader';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const ProfileSettings: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />
      <Text style={{color: 'white', fontSize: 25}}>ProfileSettings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
});

export default ProfileSettings;
