import React, { useRef, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';

import HomeScreen from '../screens/Home';
import CustomersScreen from '../screens/Customers';
import { View, StatusBar } from 'react-native';
import { colors } from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Customers: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const MyStatusBar = ({ routeName }: { routeName: string | undefined }) => {
  const isHome = routeName === 'Home';
  const backgroundColor = isHome ? colors.light : colors.white;

  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle="dark-content" />
    </View>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Customers" component={CustomersScreen} />
    </Stack.Navigator>
  );
};

export default function Routes() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [currentRouteName, setCurrentRouteName] = useState<string | undefined>(undefined);

  const isHome = currentRouteName === 'Home';
  const backgroundColor = isHome ? colors.light : colors.white;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setCurrentRouteName(navigationRef.current?.getCurrentRoute()?.name);
      }}
      onStateChange={() => {
        setCurrentRouteName(navigationRef.current?.getCurrentRoute()?.name);
      }}
    >
      <MyStatusBar routeName={currentRouteName} />
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Main" component={MainStack} />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
