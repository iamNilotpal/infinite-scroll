import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Border = () => {
  return (
    <LinearGradient
      colors={['#ff87d4', '#ffe742', '#87fffb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ width: '100%', height: 10 }}
    />
  );
};

export default Border;
