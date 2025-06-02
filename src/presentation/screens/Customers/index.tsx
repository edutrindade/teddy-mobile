import { Header } from '@/presentation/components/Header';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';

import styles from './styles';
import { Button } from '@/presentation/components/Button';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@/presentation/components/Card';
import { useState } from 'react';
import { ModalConfirmation } from '@/presentation/components/ModalConfirmation';

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
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(12);

  const handleAdd = (id: number) => {
    console.log('Add customer');
  };

  const handleEdit = (id: number) => {
    console.log('Edit customer');
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

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <TouchableOpacity
          key="first"
          style={styles.paginationButton}
          onPress={() => handlePageChange(1)}
        >
          <Text style={styles.paginationText}>1</Text>
        </TouchableOpacity>
      );

      if (startPage > 2) {
        pages.push(
          <Text key="dots-start" style={styles.paginationText}>
            ...
          </Text>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[styles.paginationButton, i === currentPage && styles.paginationButtonActive]}
          onPress={() => handlePageChange(i)}
        >
          <Text style={[styles.paginationText, i === currentPage && styles.paginationTextActive]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page);
        // Aqui você chamaria a API novamente com a nova página
        console.log('Mudando para a página:', page);
      }
    };

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <Text key="dots-end" style={styles.paginationText}>
            ...
          </Text>
        );
      }
      pages.push(
        <TouchableOpacity
          key="last"
          style={styles.paginationButton}
          onPress={() => handlePageChange(totalPages)}
        >
          <Text style={styles.paginationText}>{totalPages}</Text>
        </TouchableOpacity>
      );
    }

    return <View style={styles.pagination}>{pages}</View>;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.quantityText}>{customers.length}</Text>
          <Text style={styles.titleDescription}>clientes encontrados:</Text>
        </View>

        <View style={styles.paginationContainer}>
          <Text style={styles.titleDescription}>Clientes por página: </Text>
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
          <Button title="Criar cliente" onPress={() => navigation.navigate('Home')} outline />
        </View>

        {renderPagination()}
      </View>

      <ModalConfirmation
        visible={showModalDelete}
        confirm={() => {
          console.log('Cliente excluído');
          setShowModalDelete(false);
        }}
        close={() => setShowModalDelete(false)}
      />
    </View>
  );
}
