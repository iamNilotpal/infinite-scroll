import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import arrowLeft from '../../assets/arrow-left.png';
import { AppStackParams } from '../../navigation/AppNavigation';
import styles from './styles';

const CatScreen = () => {
  const { params: cat } = useRoute<RouteProp<AppStackParams, 'CatScreen'>>();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <ScrollView>
      <Image
        source={{ uri: cat.image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}>
        <Image source={arrowLeft as ImageSourcePropType} style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <View style={styles.container}>
          <Text style={styles.name}>{cat.name}</Text>
          <Text style={styles.origin}>{cat.origin}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.text}>{cat.description}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Temperament</Text>
          <Text style={styles.text}>{cat.temperament}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Life span</Text>
          <Text style={styles.text}>{cat.life_span} years</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Scores</Text>
          <View style={styles.flex}>
            <Text style={styles.text}>Adaptability</Text>
            <Text style={styles.mr}>-</Text>
            <Text style={styles.text}>{cat.adaptability}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.text}>Child Friendly</Text>
            <Text style={styles.mr}>-</Text>
            <Text style={styles.text}>{cat.child_friendly}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.text}>Stranger Friendly</Text>
            <Text style={styles.mr}>-</Text>
            <Text style={styles.text}>{cat.stranger_friendly}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Wikipedia URL</Text>
          <Text
            style={[styles.text, { color: '#2d7fea' }]}
            onPress={() => Linking.openURL(cat.wikipedia_url)}>
            {cat.wikipedia_url}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CatScreen;
