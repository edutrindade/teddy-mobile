import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';

import styles from './styles';
import { colors } from '@/presentation/styles/colors';

interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: object;
  inputStyle?: object;
  ref?: React.RefObject<TextInput> | undefined;
}

export const Input = ({ label, containerStyle, inputStyle, ref, ...rest }: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={colors.grey}
        {...rest}
        ref={ref}
      />
    </View>
  );
};
