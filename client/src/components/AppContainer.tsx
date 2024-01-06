import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface Props {
  children: ReactNode;
}

const AppContainer: FC<Props> = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
