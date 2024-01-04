import SignUp from '@views/auth/SignUp';
import {I18nManager} from 'react-native';

// Force LTR text direction
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const App = () => {
  return <SignUp />;
};

export default App;
