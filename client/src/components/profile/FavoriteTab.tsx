import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const FavoriteTab: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Favorite</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoriteTab;
