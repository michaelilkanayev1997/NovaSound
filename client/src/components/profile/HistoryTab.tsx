import EmptyRecords from '@ui/EmptyRecords';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFetchHistories} from 'src/hooks/query';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading} = useFetchHistories();

  if (!data || !data[0]?.audios.length)
    return <EmptyRecords title="There is no histories available!" />;

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HistoryTab;
