import { colors } from '@/presentation/styles/colors';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
