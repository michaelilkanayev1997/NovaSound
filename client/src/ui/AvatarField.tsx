import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  source?: string;
}

const avatarSize = 70;

const AvatarField: FC<Props> = ({source}) => {
  return (
    <View>
      {source ? (
        <Image source={{uri: source}} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarImage}>
          <AntDesign name="user" size={30} color={colors.PRIMARY_DARK1} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.Info,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.PRIMARY_DARK1,
    elevation: 10,
  },
});

export default AvatarField;
