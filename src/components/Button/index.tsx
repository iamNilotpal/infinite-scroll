import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styles from './styles';

type ButtonProps = {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  containerStyle,
  textStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
