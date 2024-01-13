import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import {useFetchHistories} from 'src/hooks/query';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getClient} from 'src/api/client';
import {useMutation, useQueryClient} from 'react-query';
import {History, historyAudio} from 'src/@types/audio';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading, isFetching} = useFetchHistories();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const noData = !data?.length;

  const navigation = useNavigation();

  const removeMutation = useMutation({
    // For Slow Networks (Update UI)
    mutationFn: async histories => removeHistories(histories),
    onMutate: (histories: string[]) => {
      queryClient.setQueryData<History[]>(['histories'], oldData => {
        let newData: History[] = [];
        if (!oldData) return newData;

        for (let data of oldData) {
          const filteredData = data.audios.filter(
            item => !histories.includes(item.id),
          );
          if (filteredData.length) {
            newData.push({date: data.date, audios: filteredData});
          }
        }

        return newData;
      });
    },
  });

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    client.delete('/history?histories=' + JSON.stringify(histories));
    queryClient.invalidateQueries({queryKey: ['histories']}); // refetch histories
  };

  const handleSingleHistoryRemove = async (history: historyAudio) => {
    removeMutation.mutate([history.id]);
  };

  const handleOnLongPress = (history: historyAudio) => {
    setSelectedHistories([history.id]);
  };

  const handleMultipleHistoryRemove = async () => {
    setSelectedHistories([]);
    removeMutation.mutate([...selectedHistories]);
  };

  const handleOnPress = (history: historyAudio) => {
    setSelectedHistories(old => {
      if (old.includes(history.id)) {
        return old.filter(item => item !== history.id);
      }

      return [...old, history.id];
    });
  };

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({queryKey: ['histories']}); // refetch histories
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

  return (
    <>
      {selectedHistories.length ? (
        <Pressable
          onPress={handleMultipleHistoryRemove}
          style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove </Text>
        </Pressable>
      ) : null}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleOnRefresh}
            tintColor={colors.CONTRAST}
          />
        }
        style={styles.container}>
        {noData ? <EmptyRecords title="There is no history!" /> : null}
        {data?.map((item, mainIndex) => {
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
