import React from 'react';
import { View, TouchableOpacity, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';
import { colors } from '@/presentation/styles/colors';

import styles from './styles';
import { getSize } from '@/presentation/styles/layout';

export interface CardProps {
  name: string;
  salary: string;
  company: string;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  nameTextStyle?: StyleProp<TextStyle>;
  detailTextStyle?: StyleProp<TextStyle>;
  iconSize?: number;
}

export const Card = ({
  name,
  salary,
  company,
  onAdd,
  onEdit,
  onDelete,
  containerStyle,
  nameTextStyle,
  detailTextStyle,
  iconSize = getSize(20),
}: CardProps) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <Text style={[styles.name, nameTextStyle]}>{name}</Text>
      <Text style={[styles.detail, detailTextStyle]}>Salário: {salary}</Text>
      <Text style={[styles.detail, detailTextStyle]}>Empresa: {company}</Text>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onAdd} activeOpacity={0.7} disabled={!onAdd}>
          <IconOcticons name="plus" size={iconSize} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} activeOpacity={0.7} disabled={!onEdit}>
          <IconOcticons name="pencil" size={iconSize} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} activeOpacity={0.7} disabled={!onDelete}>
          <IconFeather name="trash-2" size={iconSize} color={colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
