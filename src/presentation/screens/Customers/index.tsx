import { Header } from '@/presentation/components/Header';
import { View, Text } from 'react-native';

export default function Customers() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Customers Screen</Text>
      </View>
    </View>
  );
}
