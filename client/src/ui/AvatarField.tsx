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
    <View style={styles.avatarImageContainer}>
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
  avatarImageContainer: {elevation: 100},
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.Info,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AvatarField;
