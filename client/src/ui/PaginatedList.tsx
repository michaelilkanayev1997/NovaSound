import {
  StyleSheet,
  FlatList,
  FlatListProps,
  Text,
  RefreshControl,
} from 'react-native';
import PulseAnimationContainer from './PulseAnimationContainer';
import colors from '@utils/colors';

interface Props<T> {
  data: FlatListProps<T>['data'];
  renderItem: FlatListProps<T>['renderItem'];
  ListEmptyComponent?: FlatListProps<T>['ListEmptyComponent'];
  isFetching?: boolean;
  refreshing?: boolean;
  hasMore?: boolean;
  onRefresh?(): void;
  onEndReached?: FlatListProps<T>['onEndReached'];
}

const PaginatedList = <T extends any>(props: Props<T>) => {
  const {
    data,
    renderItem,
    onEndReached,
    ListEmptyComponent,
    isFetching,
    onRefresh,
    refreshing = false,
    hasMore,
  } = props;

  return (
    <FlatList
      onEndReached={info => {
        if (!hasMore || isFetching) return;
        onEndReached && onEndReached(info);
      }}
      ListFooterComponent={<Footer visible={isFetching} />}
      data={data}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.CONTRAST}
        />
      }
    />
  );
};

const Footer = (props: {visible?: boolean}) => {
  if (!props.visible) return null;

  return (
    <PulseAnimationContainer>
      <Text
        style={{
          textAlign: 'center',
          color: colors.CONTRAST,
          padding: 5,
        }}>
        Please wait...
      </Text>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PaginatedList;
