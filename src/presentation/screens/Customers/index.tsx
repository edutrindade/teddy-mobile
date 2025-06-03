import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useToastNotifications } from '@/presentation/components/ToastNotification';
import { userService } from '@/services/user/UserService';
import { Header } from '@/presentation/components/Header';
import { CommonText as Text } from '@/presentation/components/CommonText';
import { Pagination } from '@/presentation/components/Pagination';
import { Button } from '@/presentation/components/Button';
import { Card } from '@/presentation/components/Card';
import { ModalConfirmation } from '@/presentation/components/ModalConfirmation';
import { BottomSheetCommon } from '@/presentation/components/BottomSheet';
import { BottomSheetDrawer } from '@/presentation/components/BottomSheetDrawer';
import { Loading } from '@/presentation/components/Loading';
import { Select } from '@/presentation/components/Select';
import { layout } from '@/presentation/styles/layout';
import { PaginatedUsersResponse } from '@/infra/external/interfaces/IApiUserService';
import { moneyMask } from '@/utils/masks';

import styles from './styles';
interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export default function Customers() {
  const { showSuccess, showError, showInfo, showWarning } = useToastNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Client[]>([]);
  const [customerSelected, setCustomerSelected] = useState<Client | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
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

  useEffect(() => {
    fetchCustomers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const fetchCustomers = async (page: number, limit: number) => {
    setIsLoading(true);
    const result = await userService.getUsers(page, limit);
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Simula um delay de 1 segundo para visualização do loading
    setIsLoading(false);
    if (result.success) {
      const data = result.response as PaginatedUsersResponse;
      setCustomers(data.clients);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } else {
      console.error('Erro ao buscar clientes:', result.error);
    }
  };

  const handleChangeField = (field: 'name' | 'salary' | 'companyValue', value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleClearForm = () => {
    setFormValues({ name: '', salary: '', companyValue: '' });
    setEditingCustomerId(null);
  };

  const handleAdd = (id: number) => {
    console.log('Select customer');
  };

  const handleEdit = (id: number) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setFormValues({
        name: customer.name,
        salary: moneyMask((customer.salary * 100).toString()),
        companyValue: moneyMask((customer.companyValuation * 100).toString()),
      });
      setEditingCustomerId(customer.id);
      setShowModalRegister(true);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: formValues.name,
      salary: parseFloat(formValues.salary.replace(/[^\d]/g, '')) / 100 || 0,
      companyValuation: parseFloat(formValues.companyValue.replace(/[^\d]/g, '')) / 100 || 0,
    };

    if (editingCustomerId) {
      const result = await userService.updateUser(editingCustomerId, payload);
      if (result.success) {
        showSuccess('Cliente atualizado com sucesso!');
        fetchCustomers(currentPage, itemsPerPage);
      } else {
        showError('Erro ao atualizar cliente. Tente novamente.');
      }
    } else {
      const result = await userService.createUser(payload);
      if (result.success) {
        showSuccess('Cliente adicionado com sucesso!');
        fetchCustomers(currentPage, itemsPerPage);
      } else {
        showError('Erro ao criar cliente. Tente novamente.');
      }
    }

    setShowModalRegister(false);
    handleClearForm();
  };

  const handleDelete = async (id: number) => {
    const result = await userService.deleteUser(id);
    if (result.success) {
      showSuccess('Cliente removido com sucesso!');
      fetchCustomers(currentPage, itemsPerPage);
    } else {
      showError('Erro ao excluir cliente. Tente novamente.');
    }
    setShowModalDelete(false);
    setCustomerSelected(null);
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
      onDelete={() => {
        setShowModalDelete(true);
        setCustomerSelected(item);
      }}
    />
  );

  if (isLoading && customers.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Header setDrawerVisible={setDrawerVisible} />
        <Loading />
      </View>
    );
  }

  if (customers.length === 0 && !isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Header setDrawerVisible={setDrawerVisible} />
        <View style={styles.container}>
          <Text style={[styles.emptyText, { marginTop: layout.screenHeight * 0.4 }]}>
            Nenhum cliente encontrado
          </Text>
          <View style={[styles.buttonContainer, { marginTop: layout.screenHeight * 0.35 }]}>
            <Button title="Criar cliente" onPress={() => setShowModalRegister(true)} outline />
          </View>
        </View>

        <BottomSheetCommon
          visible={showModalRegister && !showModalDelete && !drawerVisible}
          title={editingCustomerId ? 'Editar Cliente' : 'Criar Cliente'}
          mode={editingCustomerId ? 'edit' : 'create'}
          onConfirm={handleSubmit}
          onCancel={() => {
            setShowModalRegister(false);
            handleClearForm();
          }}
          onConfirmText={editingCustomerId ? 'Salvar' : 'Criar cliente'}
          formValues={formValues}
          onChange={handleChangeField}
          onClear={handleClearForm}
        />
      </View>
    );
  }

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
          ListFooterComponent={isLoading ? <Loading /> : null}
          onEndReachedThreshold={0.1}
        />

        <View style={styles.buttonContainer}>
          <Button title="Criar cliente" onPress={() => setShowModalRegister(true)} outline />
        </View>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => {
            setCurrentPage(page);
          }}
        />
      </View>

      <ModalConfirmation
        visible={showModalDelete}
        customer={customerSelected}
        confirm={() => {
          handleDelete(customerSelected!.id);
          setShowModalDelete(false);
        }}
        close={() => setShowModalDelete(false)}
      />

      <BottomSheetDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />

      <BottomSheetCommon
        visible={showModalRegister && !showModalDelete && !drawerVisible}
        title={editingCustomerId ? 'Editar Cliente' : 'Criar Cliente'}
        mode={editingCustomerId ? 'edit' : 'create'}
        onConfirm={handleSubmit}
        onCancel={() => {
          setShowModalRegister(false);
          handleClearForm();
        }}
        onConfirmText={editingCustomerId ? 'Salvar' : 'Criar cliente'}
        formValues={formValues}
        onChange={handleChangeField}
        onClear={handleClearForm}
      />
    </View>
  );
}
