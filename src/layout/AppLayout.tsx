import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import Border from '../components/Border';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Border />
      <View style={styles.container}>
        <StatusBar backgroundColor="#282c35" />
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#201d29',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default AppLayout;
