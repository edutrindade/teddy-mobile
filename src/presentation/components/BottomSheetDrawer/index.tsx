import React, { useMemo, useRef, useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/presentation/styles/colors';
import { CommonText as Text } from '@/presentation/components/CommonText';
import Logo from '@/assets/images/logo.png';

import styles from './styles';
import { CacheRepository } from '@/infra/data/repositories/CacheRepository';
import { asyncStorageAdapter } from '@/infra/data/adapters';

interface BottomSheetDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', icon: 'home', route: 'Home' },
  { label: 'Clientes', icon: 'person', route: 'Customers' },
  { label: 'Clientes selecionados', icon: 'people', route: 'SelectedCustomers' },
];

export const BottomSheetDrawer = ({ visible, onClose }: BottomSheetDrawerProps) => {
  const cacheRepository = CacheRepository(asyncStorageAdapter);
  const [name, setName] = React.useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(state => state.routes[state.index].name);

  useEffect(() => {
    if (visible) {
      fetchUser();

      bottomSheetRef.current?.expand();
    }
  }, [visible]);

  const fetchUser = async () => {
    const result = await cacheRepository.getUser();
    if (result.success) setName(result.response || '');
  };

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
    onClose();
  };

  if (!visible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onClose={onClose}
      backgroundStyle={{ backgroundColor: colors.transparent }}
      handleIndicatorStyle={{ display: 'none' }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <BottomSheetView style={styles.sheetContainer}>
          <View style={styles.menuContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />

            <View style={styles.menuBox}>
              <Text style={styles.welcome}>Olá, {name}!</Text>
              {menuItems.map(item => {
                const isActive = currentRouteName === item.route;

                return (
                  <TouchableOpacity
                    key={item.route}
                    onPress={() => handleNavigate(item.route)}
                    style={styles.menuItem}
                    activeOpacity={0.8}
                  >
                    <View style={styles.itemContent}>
                      <Icon
                        name={item.icon}
                        size={20}
                        color={isActive ? colors.primary : colors.black}
                        style={{ marginRight: 12 }}
                      />
                      <Text style={[styles.label, isActive && styles.activeLabel]}>
                        {item.label}
                      </Text>
                    </View>
                    {isActive && <View style={styles.activeBar} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </BottomSheetView>
      </TouchableWithoutFeedback>
    </BottomSheet>
  );
};
