import {FC} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useFetchFavorite} from './../../hooks/query';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import AudioListItem from '@ui/AudioListItem';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'src/store/player';
import useAudioController from 'src/hooks/useAudioController';
import colors from '@utils/colors';
import {useQueryClient} from 'react-query';

interface Props {}

const FavoriteTab: FC<Props> = props => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const {data, isLoading, isFetching} = useFetchFavorite();
  const queryClient = useQueryClient();

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({queryKey: ['favorite']}); // refetch favorites
  };

  if (isLoading) return <AudioListLoadingUI />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleOnRefresh}
          tintColor={colors.CONTRAST}
        />
      }
      style={styles.container}>
      {!data?.length ? (
        <EmptyRecords title="There is no favorite audio." />
      ) : null}
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
