import {FC, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const Home: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 25}}>Loading</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {data?.map(item => {
        return (
          <Text key={item.id} style={{color: 'white', paddingVertical: 10}}>
            {item.title}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
