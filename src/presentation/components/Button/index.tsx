import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

import styles from './styles';

interface ButtonProps {
  testId?: string;
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  outline?: boolean;
}

export const Button = ({
  testId,
  title,
  onPress,
  containerStyle,
  textStyle,
  disabled = false,
  outline = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        containerStyle,
        disabled && styles.disabledButton,
        outline && styles.buttonOutlined,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testId ? testId : undefined}
    >
      <Text style={[styles.text, textStyle, outline && styles.buttonOutlinedText]}>{title}</Text>
    </TouchableOpacity>
  );
};
