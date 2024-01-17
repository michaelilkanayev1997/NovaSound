import OptionsModal from '@components/OptionsModal';
import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import {FC, useState} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {AudioData} from 'src/@types/audio';
import {useFetchUploadsByProfile} from 'src/hooks/query';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '@utils/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import OptionSelector from '@ui/OptionSelector';
import {useQueryClient} from 'react-query';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {data, isLoading, isFetching} = useFetchUploadsByProfile();
  const {onAudioPress} = useAudioController();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const queryClient = useQueryClient();

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({queryKey: ['uploads-by-profile']}); // refetch Uploads
  };

  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnEditPress = () => {
    setShowOptions(false);
    if (selectedAudio) navigate('UpdateAudio', {audio: selectedAudio});
  };

  if (isLoading) return <AudioListLoadingUI />;

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleOnRefresh}
            tintColor={colors.CONTRAST}
          />
        }>
        {!data?.length ? <EmptyRecords title="There is no audio." /> : null}
        {data?.map(item => {
          return (
            <AudioListItem
              onPress={() => onAudioPress(item, data)}
              key={item.id}
              audio={item}
              isPlaying={onGoingAudio?.id === item.id}
              onLongPress={() => handleOnLongPress(item)}
            />
          );
        })}
      </ScrollView>

      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Edit',
            icon: 'edit',
            onPress: handleOnEditPress,
          },
        ]}
        renderItem={item => {
          return (
            <OptionSelector
              icon={
                <AntDesign size={24} color={colors.PRIMARY} name={item.icon} />
              }
              label={item.title}
              onPress={item.onPress}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UploadsTab;
