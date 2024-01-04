import {NavigationContainer} from '@react-navigation/native';
import {I18nManager} from 'react-native';
import AuthNavigator from 'src/navigation/AuthNavigator';

// Force LTR text direction
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
