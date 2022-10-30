import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

import catImage from '../../assets/cat.jpg';
import Button from '../../components/Button';
import { AppStackParams } from '../../navigation/AppNavigation';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <View style={styles.container}>
      <Image
        source={catImage as ImageSourcePropType}
        style={styles.catImage}
        resizeMode="center"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Find Your <Text style={styles.dream}>Dream</Text> Cat Here
        </Text>
      </View>
      <Button
        text="Continue"
        onPress={() => navigation.replace('CatsScreen')}
        containerStyle={{ marginTop: 100 }}
      />
    </View>
  );
};

export default HomeScreen;
