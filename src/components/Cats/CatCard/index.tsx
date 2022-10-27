import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppStackParams } from '../../../navigation/AppNavigation';
import { CatType } from '../types';

const CatCard: React.FC<{ item: CatType }> = ({ item }) => {
  const { image, name, origin } = item;
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('CatScreen', item)}>
      <Image
        source={{ uri: image.url }}
        resizeMode="center"
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.origin}>{origin}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#403c4a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 80,
  },
  name: {
    color: '#f4f2fb',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  origin: {
    color: '#b1acb9',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default CatCard;
