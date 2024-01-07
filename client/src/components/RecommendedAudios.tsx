import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useFetchRecommendedAudios} from 'src/hooks/query';

interface Props {}

const RecommendedAudios: FC<Props> = props => {
  const {data, isLoading} = useFetchRecommendedAudios();

  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
        {data?.map(item => {
          return (
            <View style={{width: '33.33%'}} key={item.id}>
              <View style={{padding: 5}}>
                <Image
                  source={{uri: item.poster}}
                  style={{width: '100%', aspectRatio: 1, borderRadius: 7}}
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
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default RecommendedAudios;
