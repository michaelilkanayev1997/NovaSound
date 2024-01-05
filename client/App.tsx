import {NavigationContainer} from '@react-navigation/native';
import {I18nManager} from 'react-native';
import AuthNavigator from 'src/navigation/AuthNavigator';
import {Provider} from 'react-redux';
import store from 'src/store';

// Force LTR text direction
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
