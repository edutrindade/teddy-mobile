import React, { useState, useMemo, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, View, Keyboard, Platform, TouchableOpacity } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import IconFAwesome from 'react-native-vector-icons/FontAwesome6';
import { Input } from '@/presentation/components/Input';
import { Button } from '@/presentation/components/Button';
import { colors } from '@/presentation/styles/colors';
import { layout } from '@/presentation/styles/layout';
import { moneyMask } from '@/utils/masks';

import styles from './styles';

interface BottomSheetProps {
  visible: boolean;
  title?: string;
  mode?: 'create' | 'edit';
  onConfirm: () => void;
  onCancel: () => void;
  onConfirmText?: string;
  formValues: {
    name: string;
    salary: string;
    companyValue: string;
  };
  onChange: (field: 'name' | 'salary' | 'companyValue', value: string) => void;
  onClear: () => void;
}

export const BottomSheetCommon = ({
  visible,
  title = 'Confirmação',
  mode = 'create',
  onConfirm,
  onConfirmText = 'Confirmar',
  onCancel,
  formValues,
  onChange,
  onClear,
}: BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [percentage, setPercentage] = useState(55);
  const snapPoints = useMemo(() => [`${percentage}%`], []);
  const nameInputRef = useRef<any>(null);
  const salaryInputRef = useRef<any>(null);
  const companyValueInputRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyboardShow = () => {
      if (nameInputRef.current?.isFocused()) {
        setPercentage(60);
      } else if (salaryInputRef.current?.isFocused()) {
        setPercentage(73);
      } else if (companyValueInputRef.current?.isFocused()) {
        setPercentage(85);
      } else {
        setPercentage(55);
      }

      bottomSheetRef.current?.snapToIndex(0);
    };

    const handleKeyboardHide = () => {
      setPercentage(55);
      bottomSheetRef.current?.snapToIndex(0);
    };
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!visible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={percentage <= 55 ? snapPoints : [`${percentage}%`]}
      backgroundStyle={{ backgroundColor: colors.grey200 }}
      enablePanDownToClose
      enableContentPanningGesture
      enableHandlePanningGesture
      enableBlurKeyboardOnGesture
      onClose={onCancel}
      keyboardBehavior={Platform.OS === 'ios' ? 'interactive' : 'extend'}
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: colors.white }}
    >
      <BottomSheetView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onClear}>
              <IconFAwesome name="eraser" size={layout.iconSize.medium} color={colors.white} />
            </TouchableOpacity>
          </View>

          <Input
            ref={nameInputRef}
            label="Nome"
            placeholder="Digite o nome:"
            value={formValues.name}
            onChangeText={text => onChange('name', text)}
            inputStyle={styles.inputRounded}
            containerStyle={{ marginVertical: layout.spacing.normal }}
            returnKeyType="next"
            returnKeyLabel="Próximo"
            onSubmitEditing={() => {
              if (salaryInputRef.current) {
                salaryInputRef.current.focus();
                nameInputRef.current.blur();
              }
            }}
          />

          <Input
            ref={salaryInputRef}
            label="Salário"
            placeholder="Digite o salário:"
            value={formValues.salary}
            onChangeText={text => onChange('salary', moneyMask(text))}
            keyboardType="numeric"
            maxLength={14}
            inputStyle={styles.inputRounded}
            containerStyle={{ marginVertical: layout.spacing.normal }}
            returnKeyType="next"
            returnKeyLabel="Próximo"
            onSubmitEditing={() => {
              if (companyValueInputRef.current) {
                companyValueInputRef.current.focus();
                salaryInputRef.current.blur();
              }
            }}
          />

          <Input
            ref={companyValueInputRef}
            label="Valor da empresa"
            placeholder="Digite o valor da empresa:"
            value={formValues.companyValue}
            onChangeText={text => onChange('companyValue', moneyMask(text))}
            keyboardType="numeric"
            maxLength={14}
            inputStyle={styles.inputRounded}
            containerStyle={{ marginVertical: layout.spacing.normal }}
            returnKeyType="done"
            returnKeyLabel="Concluir"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              setPercentage(55);
            }}
          />

          <Button
            title={onConfirmText || (mode === 'edit' ? 'Salvar alterações' : 'Criar cliente')}
            onPress={onConfirm}
            disabled={!formValues.name || !formValues.salary || !formValues.companyValue}
            containerStyle={styles.button}
            textStyle={styles.txtButton}
          />
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheet>
  );
};
