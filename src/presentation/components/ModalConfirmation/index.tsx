import React from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { CommonText as Text } from '../CommonText';

import styles from './styles';
import { layout } from '@/presentation/styles/layout';

interface ModalConfirmationProps {
  visible: boolean;
  confirm: () => void;
  close: () => void;
}

export const ModalConfirmation = ({ visible = false, confirm, close }: ModalConfirmationProps) => {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Excluir cliente:</Text>
          <Text style={styles.modalDescription}>
            Tem certeza que deseja excluir o cliente Eduardo?
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
