import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '@/presentation/styles/colors';
import Logo from '@/assets/images/logo.png';

import styles from './styles';

interface HeaderProps {
  setDrawerVisible: (visible: boolean) => void;
}

export const Header = ({ setDrawerVisible }: HeaderProps) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  //const onMenuPress = () => navigation.openDrawer();

  const onMenuPress = () => {
    setDrawerVisible(true);
  };

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
