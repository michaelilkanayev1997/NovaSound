import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const ProfileSettings: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 25}}>ProfileSettings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileSettings;
