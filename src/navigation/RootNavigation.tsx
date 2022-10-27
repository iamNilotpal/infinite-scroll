import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigation from './AppNavigation';

const theme = Object.freeze({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#201d29',
  },
});

const RootNavigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
