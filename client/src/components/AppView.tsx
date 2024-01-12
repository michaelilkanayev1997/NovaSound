import {FC, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import MiniAudioPlayer from './MiniAudioPlayer';
//import useAudioController from 'src/hooks/useAudioController';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'src/store/player';

interface Props {
  children: ReactNode;
}

const AppView: FC<Props> = ({children}) => {
  //const {isPlayerReady} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      {onGoingAudio ? <MiniAudioPlayer /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  children: {
    flex: 1,
  },
});

export default AppView;
