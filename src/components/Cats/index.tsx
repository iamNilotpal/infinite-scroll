import { AnimatedFlashList } from '@shopify/flash-list';
import React from 'react';

import CatCard from './CatCard';
import { CatType } from './types';

type CatsPreviewProps = {
  catsData: any[] | undefined | CatType[];
  loadMoreCats: () => void;
  isFetching: boolean;
};

const CatsPreview: React.FC<CatsPreviewProps> = ({
  catsData,
  loadMoreCats,
  isFetching,
}) => {
  return (
    <AnimatedFlashList
      data={catsData}
      renderItem={({ item }: { item: CatType }) => (
        <CatCard item={item} key={item.id} />
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      estimatedItemSize={200}
      refreshing={isFetching}
      onRefresh={loadMoreCats}
      onEndReached={loadMoreCats}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{ paddingVertical: 12 }}
      bounces
    />
  );
};

export default CatsPreview;
