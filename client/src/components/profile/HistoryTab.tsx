import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Pressable} from 'react-native';
import {useFetchHistories} from 'src/hooks/query';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getClient} from 'src/api/client';
import {useQueryClient} from 'react-query';
import {historyAudio} from 'src/@types/audio';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading} = useFetchHistories();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);

  const navigation = useNavigation();

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    client.delete('/history?histories=' + JSON.stringify(histories));
    queryClient.invalidateQueries({queryKey: ['histories']}); // refetch histories
  };

  const handleSingleHistoryRemove = async (history: historyAudio) => {
    await removeHistories([history.id]);
  };

  const handleOnLongPress = (history: historyAudio) => {
    setSelectedHistories([history.id]);
  };

  const handleOnPress = (history: historyAudio) => {
    setSelectedHistories(old => {
      if (old.includes(history.id)) {
        return old.filter(item => item !== history.id);
      }

      return [...old, history.id];
    });
  };

  const handleMultipleHistoryRemove = async () => {
    setSelectedHistories([]);
    await removeHistories([...selectedHistories]);
  };

  useEffect(() => {
    const unselecHistories = () => {
      setSelectedHistories([]);
    };
    navigation.addListener('blur', unselecHistories);

    return () => {
      // Remove the listener
      navigation.removeListener('blur', unselecHistories);
    };
  }, []);

  if (isLoading) return <AudioListLoadingUI />;

  if (!data || !data[0]?.audios.length)
    return <EmptyRecords title="There is no history!" />;

  return (
    <>
      {selectedHistories.length ? (
        <Pressable
          onPress={handleMultipleHistoryRemove}
          style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove </Text>
        </Pressable>
      ) : null}
      <ScrollView style={styles.container}>
        {data.map((item, mainIndex) => {
          return (
            <View key={item.date + mainIndex}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.listContainer}>
                {item.audios.map((audio, index) => {
                  return (
                    <Pressable
                      onLongPress={() => handleOnLongPress(audio)}
                      onPress={() => handleOnPress(audio)}
                      key={audio.id + index}
                      style={[
                        styles.history,
                        {
                          backgroundColor: selectedHistories.includes(audio.id)
                            ? colors.OVERLAY
                            : colors.PRIMARY_DARK1,
                        },
                      ]}>
                      <Text style={styles.historyTitle}>{audio.title}</Text>
                      <Pressable
                        onPress={() => handleSingleHistoryRemove(audio)}>
                        <AntDesign
                          name="close"
                          color={colors.CONTRAST}
                          size={14}
                        />
                      </Pressable>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  removeBtn: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  removeBtnText: {color: colors.CONTRAST},
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
