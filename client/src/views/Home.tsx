import {FC} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'src/store/notification';

interface Props {}

const Home: FC<Props> = props => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="lol"
        onPress={() => {
          dispatch(
            updateNotification({
              message: 'Uploaded successfully !',
              type: 'error',
            }),
          );
        }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
