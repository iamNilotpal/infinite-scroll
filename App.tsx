import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import Border from './src/components/Border';
import AppLayout from './src/layout/AppLayout';
import RootNavigation from './src/navigation/RootNavigation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" backgroundColor="#201d29" />
      <AppLayout>
        <Border />
        <RootNavigation />
      </AppLayout>
    </QueryClientProvider>
  );
};

export default App;
