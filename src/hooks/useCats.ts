import { useInfiniteQuery } from 'react-query';

const fetcher = async (pageNumber: number = 0) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds?limit=20&page=${pageNumber}`,
    );
    const data = await response.json();
    return { data, nextPage: pageNumber + 1 };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Something went wrong.');
  }
};

export default function useCats() {
  const {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['dogs'], () => fetcher(), {
    getNextPageParam: lastPage => {
      if (lastPage.data.length < 20) return undefined;
      return lastPage.nextPage;
    },
    staleTime: Infinity,
  });

  return {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
}
