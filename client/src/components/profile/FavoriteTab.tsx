import {FC} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useFetchFavorite} from './../../hooks/query';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import AudioListItem from '@ui/AudioListItem';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'src/store/player';
import useAudioController from 'src/hooks/useAudioController';

interface Props {}

const FavoriteTab: FC<Props> = props => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const {data, isLoading} = useFetchFavorite();

  if (isLoading) return <AudioListLoadingUI />;

  if (!data?.length)
    return <EmptyRecords title="There is no favorite audio." />;

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return (
          <AudioListItem
            onPress={() => onAudioPress(item, data)}
            key={item.id}
            audio={item}
            isPlaying={onGoingAudio?.id === item.id}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoriteTab;
