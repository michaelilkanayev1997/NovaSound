import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFetchUploadsByProfile} from 'src/hooks/query';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile();

  console.log(data);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Upload</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UploadsTab;
