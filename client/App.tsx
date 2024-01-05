import {I18nManager} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from 'src/navigation';
import store from 'src/store';

// Force LTR text direction
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
