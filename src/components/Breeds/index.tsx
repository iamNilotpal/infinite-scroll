import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import useCats from '../../hooks/useCats';
import Loader from '../Loader';
import CatCard from './CatCard';
import { CatType } from './types';

const DogPreview = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useCats();

  const catsData = data?.pages.flatMap(page => page.data);
  const loadMoreCats = () => hasNextPage && fetchNextPage();

  return (
    <View style={styles.container}>
      {isLoading && <Loader text="LOADING BREADS" />}
      {isFetching && <ActivityIndicator color="#ffe742" size={25} />}
      {isError && (
        <Text style={styles.error}>
          {error instanceof Error ? error.message : 'Something went wrong'}.
        </Text>
      )}
      {catsData && catsData.length > 0 && (
        <FlashList
          data={catsData}
          renderItem={({ item }: { item: CatType }) => <CatCard item={item} />}
          keyExtractor={item => item.id}
          estimatedItemSize={70}
          onEndReached={loadMoreCats}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  error: {
    color: '#ffe742',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default DogPreview;
