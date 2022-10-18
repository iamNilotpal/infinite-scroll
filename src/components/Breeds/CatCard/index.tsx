import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CatType } from '../types';

const CatCard: React.FC<{ item: CatType }> = ({ item }) => {
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
