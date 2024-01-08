import BasicModalContainer from '@ui/BasicModalContainer';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  status: 'private';
  visible: boolean;
  onRequestClose(): void;
}

const PlaylistForm: FC<Props> = ({status, visible, onRequestClose}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          placeholder="Title"
          placeholderTextColor={colors.PRIMARY}
          style={styles.input}
        />
        <Pressable style={styles.privateSelector}>
          {status === 'private' ? (
            <MaterialComIcon name="radiobox-marked" color={colors.PRIMARY} />
          ) : (
            <MaterialComIcon name="radiobox-blank" color={colors.PRIMARY} />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>

        <Pressable style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Create</Text>
        </Pressable>
      </View>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
  },
  submitBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
  submitBtnText: {
    color: colors.PRIMARY,
  },
});

export default PlaylistForm;
