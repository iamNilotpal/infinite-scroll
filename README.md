## `Preview`

<video src="src/assets/blog.mp4" autoplay height=400></video>

## The Problem

Since I first began using React Native, I have encountered this warning at least a dozen times, or maybe you too:

```bash
VirtualizedList: You have a large list that is slow to update — make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, React.memo, useCallback, useMemo etc.
```

Right, it seems familiar isn't it? This typically occurs when we load up a FlatList with lots of items that aren't just static text or images but instead have components with animations or data from third party api or other interactions.

## Why FlashList?

The listing interface used by `FlatList`, which is based on ScrollView, is termed VirtualizedList. Under the hood, VirtualizedList makes use of a rendering API that renders an enumerable list of items as a scroll. Perhaps because we use the newest iPhone and effortlessly post to Instagram every day, we don't see it. Even if everything appears to be in order, you can still encounter this problem if your project runs on low-end devices, particularly Android ones. Simply put, in order to figure it out, such strategies also require some computations.

Here comes to rescue `FlashList`, An alternative to FlatList that uses the UI thread and, according to their website, is 10 times quicker in JS and 5 times faster in JS thread. These performance gains are pretty impressive, even if only half the improvement is taken into account.

## Initializing React Native App

We will use **React Native CLI** to create our app. Make sure to check out their [installation guide](https://reactnative.dev/docs/environment-setup) if you haven't.

To get started run this command :

```bash
npx react-native init InfiniteScroll
```

Now wait until the installation is finished and then navigate to that directory.

```bash
cd InfiniteScroll
```

## Installing Dependencies

Here i'm using yarn you can use npm too.

```bash
yarn add @shopify/flash-list react-query
```

## Setting up React Query

In order to use react-query in our project we need to setup some things. So, open you App.js file and add the following code.

```js
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" backgroundColor="#201d29" />
      <View style={styles.container}>
        <Text>Hello, World</Text>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#201d29',
  },
});

export default App;
```

> Note: I wont be covering the styling part. You can add your own styles.

## Creating Components

To get started let's first create some components. First create a directory called `src` in your root folder. Inside `src` create two new folders `components` and `hooks`. Now create a folder `Cats` inside `components` and inside that create `index.jsx` and `CatCard.jsx` file.

In `CatCard.jsx` add the following code :

```js
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CatCard = ({ item }) => {
  const { image, name, origin } = item;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image.url }}
        resizeMode="contain"
        style={styles.image}
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.origin}>{origin}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#403c4a',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 80,
    marginRight: 20,
  },
  name: { color: '#f4f2fb', fontSize: 16, fontWeight: 'bold' },
  origin: {
    color: '#b1acb9',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default CatCard;
```

In `index.jsx` file put the following code :

```js
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CatCard from './CatCard';

const CATS_DATA = [
  {
    id: '1',
    name: 'My Cat',
    origin: 'India',
    image:
      'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '1',
    name: 'Your Cat',
    origin: 'India',
    image:
      'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const CatsPreview = () => {
  return (
    <FlashList
      data={CATS_DATA}
      renderItem={({ item }) => <CatCard item={item} />}
      keyExtractor={item => item.id}
      estimatedItemSize={70}
      contentContainerStyle={{ paddingVertical: 20 }}
    />
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

export default CatsPreview;
```

Now in `App.js` file add the CatPreview Component like that :

```js
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import CatsPreview from './src/components/Cats';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" backgroundColor="#201d29" />
      <View style={styles.container}>
        <CatsPreview />
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#201d29',
  },
});

export default App;
```

## Fetching Data

To fetch data we will utilize react's custom hook. To get started create a file `useCats.js` inside `hooks` directory. We will be fetching data from the [Cats API](https://thecatapi.com) and will use the `useInfiniteQuery` hook from react-query. `useInfiniteQuery` hooks accepts the same arguments as `useQuery`. First one is an array of unique keys, second is a fetcher function which will fetch the data and third is an optional object with some properties.

Inside `useCats.js` file add the following code :

```js
import { useInfiniteQuery } from 'react-query';

const fetcher = async (pageNumber: number = 0) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds?limit=20&page=${pageNumber}`,
    );
    const data = await response.json();
    return { data, nextPage: pageNumber + 1 };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default function useCats() {
  const { data, isError, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(['dogs'], () => fetcher(), {
      getNextPageParam: ({ nextPage }) => nextPage,
      staleTime: Infinity,
    });

  return {
    data,
    isError,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  };
}
```

In the above code the `fetcher` function accepts an argument `pageNumber` to paginate the data form the api. The returned data is also modified, which is an object containing the keys data and nextPage. Every time an API call is successful, nextPage is increased. This format of the data is required by useInfiniteQuery. The response we received from the `fetcher` method is passed as the lastPage parameter, which is accepted by getNextPageParam, which then returns the subsequent page. `useInfiniteQuery` returns several additional methods to us. There are now functions `fetchNextPage` and a boolean property `hasNextPage` which indicates if we can make more query.

## Combining everything

The data format returned by `useInfiniteQuery` is an object with two keys:

- pageParams - an array of the page number
- pages - an array of our data for each page

In order to map through the data for each page as an array and render them, we must flatten the pages first. We can use the flatMap method.

```js
const catsData = data?.pages.flatMap(page => page.data);
```

Now update the `index.jsx` file in `Cats` folder with the following code :

```js
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useCats from '../../hooks/useCats';
import Loader from '../Loader';
import CatCard from './CatCard';

const CatsPreview = () => {
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
      {isFetching && <ActivityIndicator color="#ffe742" size={25} />} // FETCHING INDICATOR
      {isError && (
        <Text style={styles.error}>
          {error.message : 'Something went wrong'}. // ERROR HANDLING
        </Text>
      )}
      {catsData && catsData.length > 0 && (
        <FlashList
          data={catsData}
          renderItem={({ item }) => <CatCard item={item} />}
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

export default CatsPreview;
```

When scroll position reaches the threshold value, a function to load new data can be called. In React Native, the threshold value ranges from 0 to 1, with 0.5 serving as the default. In above code we have used `hasNextPage` and `fetchNextPage` to create the function `loadMoreCats` which will be used to fetch cats when scrolling.
