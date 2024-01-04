import LostPassword from '@views/auth/LostPassword';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import Verification from '@views/auth/Verification';
import {I18nManager} from 'react-native';

// Force LTR text direction
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const App = () => {
  return <Verification />;
};

export default App;
