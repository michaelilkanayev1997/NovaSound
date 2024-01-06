import AppContainer from '@components/AppContainer';
import {clearAsyncStorage} from '@utils/asyncStorage';
import {I18nManager} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from 'src/navigation';
import store from 'src/store';

// Force LTR text direction
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const App = () => {
  clearAsyncStorage().then(() => {
    console.log('logged out');
  });

  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;
