import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text, ScrollView, Pressable} from 'react-native';
import {useFetchHistories} from 'src/hooks/query';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading} = useFetchHistories();

  if (isLoading) return <AudioListLoadingUI />;

  if (!data || !data[0]?.audios.length)
    return <EmptyRecords title="There is no histories available!" />;

  return (
    <ScrollView style={styles.container}>
      {data.map((item, mainIndex) => {
        return (
          <View key={item.date + mainIndex}>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.listContainer}>
              {item.audios.map((audio, index) => {
                return (
                  <View key={audio.id + index} style={styles.history}>
                    <Text style={styles.historyTitle}>{audio.title}</Text>
                    <Pressable>
                      <AntDesign
                        name="close"
                        color={colors.CONTRAST}
                        size={14}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  date: {
    color: colors.SECONDARY,
  },
  historyTitle: {
    color: colors.CONTRAST,
    paddingHorizontal: 5,
    fontWeight: '700',
    flex: 1,
  },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_DARK1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default HistoryTab;
