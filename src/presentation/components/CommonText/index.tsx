import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import styles from './styles';

export const CommonText = forwardRef<Text, TextProps>(
  ({ children, style: customStyle, ...rest }, ref) => {
    return (
      <Text ref={ref} style={[styles.text, customStyle]} {...rest}>
        {children}
      </Text>
    );
  }
);
