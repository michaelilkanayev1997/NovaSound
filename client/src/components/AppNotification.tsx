import colors from '@utils/colors';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getNotificationState, updateNotification} from 'src/store/notification';

const AppNotification: React.FC = () => {
  const {message, type} = useSelector(getNotificationState);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  let backgroundColor = colors.ERROR;
  let textColor = colors.INACTIVE_CONTRAST;
  let title = 'Error';
  let iconName = 'warning';

  switch (type) {
    case 'success':
      backgroundColor = colors.SUCCESS;
      textColor = 'black';
      title = 'Success';
      iconName = 'check';
      break;
    case 'info':
      backgroundColor = colors.Info;
      textColor = 'F6F4F4';
      title = 'Info';
      iconName = 'info';
      break;
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const performAnimation = () => {
      setShowToast(true);

      timeoutId = setTimeout(() => {
        setShowToast(false);
        dispatch(updateNotification({message: '', type}));
      }, 3000);
    };

    if (message) {
      performAnimation();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [message]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {showToast && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            top: '5%',
            backgroundColor,
            width: '80%',
            position: 'absolute',
            borderRadius: 5,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            shadowColor: '#003049',
            shadowOpacity: 0.9,
            shadowRadius: 2,
            shadowOffset: {width: 0, height: 1},
            elevation: 2,
          }}>
          <Icon name={iconName} size={30} color="#F6F4F4" />
          <View>
            <Text
              style={{
                color: '#F6F4F4',
                fontWeight: 'bold',
                marginLeft: 10,
                fontSize: 16,
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: '#F6F4F4',
                fontWeight: '500',
                marginLeft: 10,
                fontSize: 14,
              }}>
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default AppNotification;
