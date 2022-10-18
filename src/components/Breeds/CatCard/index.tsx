import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CatType } from '../types';

const CatCard: React.FC<{ item: CatType }> = ({ item }) => {
  const { image, name } = item;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image.url }}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#403c4a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 80,
    marginRight: 20,
  },
  name: { color: '#f4f2fb', fontSize: 15, fontWeight: '600' },
});

export default CatCard;
