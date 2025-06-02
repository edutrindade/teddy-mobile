import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/presentation/components/Header';
import { CommonText as Text } from '@/presentation/components/CommonText';
import { Pagination } from '@/presentation/components/Pagination';
import { Button } from '@/presentation/components/Button';
import { Card } from '@/presentation/components/Card';
import { ModalConfirmation } from '@/presentation/components/ModalConfirmation';
import { BottomSheetCommon } from '@/presentation/components/BottomSheet';
import { moneyMask } from '@/utils/masks';

import styles from './styles';
import { BottomSheetDrawer } from '@/presentation/components/BottomSheetDrawer';
import { Select } from '@/presentation/components/Select';
import { layout } from '@/presentation/styles/layout';

interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

export default function Customers() {
  const navigation = useNavigation();

  const [customers, setCustomers] = useState<Client[]>([
    {
      id: 34,
      name: 'Bruno Henrique Lima SIlva',
      salary: 7500,
      companyValuation: 12000,
      createdAt: '2025-05-12T23:55:11.780Z',
      updatedAt: '2025-05-13T00:02:30.722Z',
    },
    {
      id: 35,
      name: 'Carla Menezes',
      salary: 120000,
      companyValuation: 80000,
      createdAt: '2025-05-12T23:55:37.241Z',
      updatedAt: '2025-05-12T23:55:37.241Z',
    },
    {
      id: 36,
      name: 'Fernando Castro',
      salary: 81000,
      companyValuation: 100000,
      createdAt: '2025-05-12T23:56:00.770Z',
      updatedAt: '2025-05-12T23:56:00.770Z',
    },
    {
      id: 37,
      name: 'Gustavo Almeida',
      salary: 76300,
      companyValuation: 11300,
      createdAt: '2025-05-12T23:56:43.248Z',
      updatedAt: '2025-05-12T23:56:43.248Z',
    },
    {
      id: 39,
      name: 'Denis Augusto',
      salary: 78000,
      companyValuation: 784550,
      createdAt: '2025-05-13T00:03:35.632Z',
      updatedAt: '2025-05-13T00:03:35.632Z',
    },
    {
      id: 42,
      name: 'Marcos Doe',
      salary: 5000,
      companyValuation: 500000,
      createdAt: '2025-05-29T22:38:43.755Z',
      updatedAt: '2025-05-29T22:38:43.755Z',
    },
    {
      id: 43,
      name: 'John Doe',
      salary: 5000,
      companyValuation: 500000,
      createdAt: '2025-05-31T01:02:59.781Z',
      updatedAt: '2025-05-31T01:02:59.781Z',
    },
  ]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(12);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    name: '',
    salary: '',
    companyValue: '',
  });
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  const handleChangeField = (field: 'name' | 'salary' | 'companyValue', value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleClearForm = () => {
    setFormValues({ name: '', salary: '', companyValue: '' });
    setEditingClientId(null);
  };

  const handleAdd = (id: number) => {
    console.log('Add customer');
  };

  const handleEdit = (id: number) => {
    const client = customers.find(c => c.id === id);
    if (client) {
      setFormValues({
        name: client.name,
        salary: moneyMask(client.salary.toString()),
        companyValue: moneyMask(client.companyValuation.toString()),
      });
      setEditingClientId(client.id);
      setShowModalRegister(true);
    }
  };

  const handleSubmit = () => {
    const payload = {
      name: formValues.name,
      salary: parseFloat(formValues.salary.replace(/[^\d]/g, '')) || 0,
      companyValuation: parseFloat(formValues.companyValue.replace(/[^\d]/g, '')) || 0,
    };

    if (editingClientId) {
      console.log('Atualizar cliente', editingClientId, payload);
      // chamada de update...
    } else {
      console.log('Cadastrar novo cliente', payload);
      // chamada de criação...
    }

    setShowModalRegister(false);
    handleClearForm();
  };

  const handleDelete = (id: number) => {
    setShowModalDelete(true);
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
      onAdd={() => handleAdd(item.id)}
      onEdit={() => handleEdit(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Header setDrawerVisible={setDrawerVisible} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.quantityText}>{customers.length}</Text>
          <Text style={styles.titleDescription}>clientes encontrados</Text>
        </View>

        <View style={styles.paginationContainer}>
          <Text style={styles.titleDescription}>Clientes por página</Text>

          <Select
            value={itemsPerPage}
            onChange={val => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
            options={[
              { label: '5', value: 5 },
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]}
            placeholder="Itens por página"
            containerStyle={{ width: layout.screenWidth * 0.14 }}
          />
        </View>

        <FlatList
          data={customers}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente encontrado.</Text>}
        />

        <View style={styles.buttonContainer}>
          <Button title="Criar cliente" onPress={() => setShowModalRegister(true)} outline />
        </View>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => {
            setCurrentPage(page);
            console.log('Mudando para página:', page);
          }}
        />
      </View>

      <ModalConfirmation
        visible={showModalDelete}
        confirm={() => {
          console.log('Cliente excluído');
          setShowModalDelete(false);
        }}
        close={() => setShowModalDelete(false)}
      />

      <BottomSheetDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />

      <BottomSheetCommon
        visible={showModalRegister}
        title={editingClientId ? 'Editar Cliente' : 'Criar Cliente'}
        mode={editingClientId ? 'edit' : 'create'}
        onConfirm={handleSubmit}
        onCancel={() => {
          setShowModalRegister(false);
          handleClearForm();
        }}
        onConfirmText={editingClientId ? 'Salvar' : 'Criar cliente'}
        formValues={formValues}
        onChange={handleChangeField}
        onClear={handleClearForm}
      />
    </View>
  );
}
