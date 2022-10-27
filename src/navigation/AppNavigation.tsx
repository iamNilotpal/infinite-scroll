import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CatType } from '../components/Cats/types';

import CatScreen from '../screens/Cat';
import CatsScreen from '../screens/Cats';
import HomeScreen from '../screens/Home';

export type AppStackParams = {
  HomeScreen: undefined;
  CatsScreen: undefined;
  CatScreen: CatType;
};

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <AppStack.Screen name="HomeScreen" component={HomeScreen} />
      <AppStack.Screen name="CatsScreen" component={CatsScreen} />
      <AppStack.Screen name="CatScreen" component={CatScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
