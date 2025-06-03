import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/presentation/components/Header';
import { CommonText as Text } from '@/presentation/components/CommonText';
import { Button } from '@/presentation/components/Button';
import { Card } from '@/presentation/components/Card';

import styles from './styles';
import { BottomSheetDrawer } from '@/presentation/components/BottomSheetDrawer';
import { Lottie } from '@/presentation/components/Lottie';

import NoFoundAnimation from '@/assets/animations/no-found.json';

interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export default function SelectedCustomers() {
  const navigation = useNavigation();

  const [selectedCustomers, setSelectedCustomers] = useState<Client[]>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const renderItem = ({ item }: { item: Client }) => (
    <Card
      name={item.name}
      salary={item.salary.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}
      company={item.companyValuation.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}
      onDelete={() => {
        setSelectedCustomers(prev => prev.filter(c => c.id !== item.id));
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Header setDrawerVisible={setDrawerVisible} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleDescription}>Clientes selecionados</Text>
        </View>

        <FlatList
          data={selectedCustomers}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Lottie source={NoFoundAnimation} width={100} />
              <Text style={styles.emptyText}>Nenhum cliente selecionado</Text>
            </View>
          }
        />

        {selectedCustomers.length > 0 && (
          <View style={styles.buttonContainer}>
            <Button
              title="Limpar clientes selecionados"
              onPress={() => setSelectedCustomers([])}
              outline
            />
          </View>
        )}
      </View>

      <BottomSheetDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}
