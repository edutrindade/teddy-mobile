import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  containerStyle,
  textStyle,
  dropdownStyle,
}: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.selectContainer, containerStyle]}
        activeOpacity={0.8}
      >
        <Text style={[styles.selectText, textStyle]}>{selectedLabel || placeholder}</Text>
        <Icon name="chevron-down" size={16} style={styles.icon} />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, dropdownStyle]}>
            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
