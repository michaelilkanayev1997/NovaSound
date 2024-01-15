import AppModal from '@ui/AppModal';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getPlaylistModalState,
  updatePlaylistVisbility,
} from 'src/store/playlistModal';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const {visible} = useSelector(getPlaylistModalState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updatePlaylistVisbility(false));
  };

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      <View />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistAudioModal;
