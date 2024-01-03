import {SafeAreaView} from 'react-native';
import Test from './src/components/Test';

const App = () => {
  return (
    <SafeAreaView>
      <Test name="john" />
    </SafeAreaView>
  );
};

export default App;
