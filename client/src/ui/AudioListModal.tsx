import colors from '@utils/colors';
import {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppModal from './AppModal';
import {AudioData} from 'src/@types/audio';
import AudioListItem from './AudioListItem';

interface Props {
  data: AudioData[];
  header?: string;
  visible: boolean;
  onRequestClose(): void;
}

const AudioListModal: FC<Props> = ({header, data, visible, onRequestClose}) => {
  return (
    <AppModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Text style={styles.header}>{header}</Text>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <AudioListItem audio={item} />;
          }}
        />
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.CONTRAST,
    paddingVertical: 10,
  },
});

export default AudioListModal;
