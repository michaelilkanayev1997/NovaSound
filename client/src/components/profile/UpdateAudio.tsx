import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const UpdateAudio: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>Update Audio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UpdateAudio;
