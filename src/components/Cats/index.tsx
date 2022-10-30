import { MasonryFlashList } from '@shopify/flash-list';
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
    <MasonryFlashList
      data={catsData}
      renderItem={({ item, index }: { item: CatType; index: number }) => (
        <CatCard item={item} key={item.id} index={index} />
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      estimatedItemSize={188.4 * (catsData?.length || 30)}
      refreshing={isFetching}
      onRefresh={loadMoreCats}
      onEndReached={loadMoreCats}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{ paddingVertical: 12 }}
    />
  );
};

export default CatsPreview;
