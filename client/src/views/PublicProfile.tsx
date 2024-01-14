import AppView from '@components/AppView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {HomeNavigatorStackParamList} from 'src/@types/navigation';

type Props = NativeStackScreenProps<
  HomeNavigatorStackParamList,
  'PublicProfile'
>;

const PublicProfile: FC<Props> = ({route}) => {
  const {profileId} = route.params;
  console.log(profileId);
  return (
    <AppView>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Public Profile</Text>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PublicProfile;
