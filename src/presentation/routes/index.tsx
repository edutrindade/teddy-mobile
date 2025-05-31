import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home';
import ClienteScreen from '../screens/Customers';
import { View, StatusBar } from 'react-native';
import { colors } from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Customers: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const MyStatusBar = () => {
  return (
    <View style={{ backgroundColor: colors.light, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={colors.light} barStyle="dark-content" />
    </View>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Customers" component={ClienteScreen} />
    </Stack.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <MyStatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
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
