import colors from '@utils/colors';
import {FC, useState} from 'react';
import {View, StyleSheet, Pressable, ViewStyle, StyleProp} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const speedRates = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2'];
const selectorSize = 40;

const PlaybackRateSelector: FC<Props> = ({containerStyle}) => {
  const [showButton, setShowButton] = useState(true);
  const width = useSharedValue(0);

  const handleOnPress = () => {
    setShowButton(false);
    width.value = withTiming(selectorSize * speedRates.length, {
      duration: 70,
    });
  };

  const widthStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {showButton ? (
        <Pressable onPress={handleOnPress}>
          <FontAwesome5 name="running" color={colors.CONTRAST} size={24} />
        </Pressable>
      ) : null}
      <Animated.View style={[styles.buttons, widthStyle]}>
        {speedRates.map(item => {
          return (
            <Pressable
              key={item}
              style={{width: selectorSize, height: selectorSize}}></Pressable>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttons: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    overflow: 'hidden',
  },
});

export default PlaybackRateSelector;
