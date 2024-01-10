import {FC, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import MiniAudioPlayer from './MiniAudioPlayer';

interface Props {
  children: ReactNode;
}

const AppView: FC<Props> = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      <MiniAudioPlayer />
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
