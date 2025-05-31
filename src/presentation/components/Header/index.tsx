import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Logo from '@/assets/images/logo.png';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '@/presentation/styles/colors';

export const Header = () => {
  const onMenuPress = () => console.log('Menu button pressed');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Icon name="menu" size={24} color={colors.light300} />
      </TouchableOpacity>
    </View>
  );
};
