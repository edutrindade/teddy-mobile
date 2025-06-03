import React from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { CommonText as Text } from '../CommonText';

import styles from './styles';
import { layout } from '@/presentation/styles/layout';
import { UserResponse } from '@/infra/external/interfaces/IApiUserService';

interface ModalConfirmationProps {
  visible: boolean;
  customer: UserResponse | null;
  confirm: () => void;
  close: () => void;
}

export const ModalConfirmation = ({
  visible = false,
  customer,
  confirm,
  close,
}: ModalConfirmationProps) => {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Excluir cliente:</Text>
          <Text style={styles.modalDescription}>
            Tem certeza que deseja excluir o cliente {customer?.name}?
          </Text>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.modalActionButton} onPress={confirm}>
              <Text style={[styles.modalActionText, { fontFamily: layout.fontFamily.bold }]}>
                Excluir cliente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalActionButton} onPress={close}>
              <Text style={styles.modalActionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
