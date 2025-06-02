import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';

import styles from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];
  const maxVisiblePages = 3;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(
      <TouchableOpacity key="first" style={styles.paginationButton} onPress={() => onPageChange(1)}>
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
        onPress={() => onPageChange(i)}
      >
        <Text style={[styles.paginationText, i === currentPage && styles.paginationTextActive]}>
          {i}
        </Text>
      </TouchableOpacity>
    );
  }

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
        onPress={() => onPageChange(totalPages)}
      >
        <Text style={styles.paginationText}>{totalPages}</Text>
      </TouchableOpacity>
    );
  }

  return <View style={styles.pagination}>{pages}</View>;
};
