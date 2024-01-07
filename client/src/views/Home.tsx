import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const Home: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <Text style={{color: 'black', fontSize: 25}}>Loading</Text>
      </PulseAnimationContainer>
    );

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.CONTRAST,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
        }}>
        Latest Uploads
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <Pressable
              onPress={() => {
                console.log('on audio press');
              }}
              onLongPress={() => {
                console.log('on audio longgg press');
              }}
              style={{width: 100, marginRight: 15}}
              key={item.id}>
              <Image
                source={{uri: item.poster}}
                style={{height: 100, aspectRatio: 1, borderRadius: 7}}
              />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: colors.CONTRAST,
                  fontWeight: '500',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default Home;
