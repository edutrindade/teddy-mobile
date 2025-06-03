import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '@/presentation/components/Header';
import { CommonText as Text } from '@/presentation/components/CommonText';
import { Button } from '@/presentation/components/Button';
import { Card } from '@/presentation/components/Card';
import { BottomSheetDrawer } from '@/presentation/components/BottomSheetDrawer';
import { Lottie } from '@/presentation/components/Lottie';
import NoFoundAnimation from '@/assets/animations/no-found.json';
import { CacheRepository } from '@/infra/data/repositories/CacheRepository';
import { asyncStorageAdapter } from '@/infra/data/adapters/AsyncStorageAdapter';

import styles from './styles';
import { useToastNotifications } from '@/presentation/components/ToastNotification';
interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export default function SelectedCustomers() {
  const cacheRepository = CacheRepository(asyncStorageAdapter);
  const { showSuccess, showError, showWarning } = useToastNotifications();
  const [selectedCustomers, setSelectedCustomers] = useState<Client[]>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchSelectedCustomers = async () => {
      const result = await cacheRepository.getSelectedCustomers();
      if (result.success) setSelectedCustomers(result.response || []);
    };
    fetchSelectedCustomers();
  }, []);

  const handleRemove = (id: number) => {
    const customer = selectedCustomers.find(c => c.id === id);
    if (customer) {
      setSelectedCustomers(prev => prev.filter(c => c.id !== id));
      cacheRepository
        .removeSelectedCustomer(id)
        .then(() => showSuccess('Cliente removido com sucesso!'))
        .catch(() => showError('Erro ao remover cliente. Tente novamente.'));
    }
  };

  const handleClearSelectedCustomers = async () => {
    const result = await cacheRepository.clearSelectedCustomers();
    if (result.success) {
      showSuccess('Nenhum cliente selecionado no momento');
      setSelectedCustomers([]);
    } else {
      showError('Erro ao limpar clientes selecionados. Tente novamente.');
    }
  };

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
      simpleCard
      onRemove={() => handleRemove(item.id)}
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
              onPress={handleClearSelectedCustomers}
              outline
            />
          </View>
        )}
      </View>

      <BottomSheetDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}
