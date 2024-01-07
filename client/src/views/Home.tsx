import {FC} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import catchAsyncError from 'src/api/catchError';
import client from 'src/api/client';
import {updateNotification} from 'src/store/notification';

interface Props {}

const fetchLatest = async () => {
  const {data} = await client('/audio/latest');
  return data.audios;
};

const Home: FC<Props> = props => {
  const dispatch = useDispatch();

  const query = useQuery(['latest-uploads'], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });

  console.log(query);

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
