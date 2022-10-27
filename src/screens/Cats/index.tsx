import React from 'react';
import { Text, View } from 'react-native';
import CatsPreview from '../../components/Cats';
import useCats from '../../hooks/useCats';
import styles from './styles';

const CatsScreen = () => {
  const { isError, data, error, fetchNextPage, hasNextPage, isFetching } =
    useCats();

  const catsData = data?.pages.flatMap(page => page.data);
  const loadMoreCats = () => hasNextPage && fetchNextPage();

  return (
    <View style={styles.container}>
      {isError && (
        <Text style={styles.error}>
          {error instanceof Error ? error.message : 'Something went wrong'}.
        </Text>
      )}
      <CatsPreview
        catsData={catsData}
        isFetching={isFetching}
        loadMoreCats={loadMoreCats}
      />
    </View>
  );
};

export default CatsScreen;
