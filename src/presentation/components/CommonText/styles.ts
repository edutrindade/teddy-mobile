import { StyleSheet } from 'react-native';
import { layout } from '@/presentation/styles/layout';
import { colors } from '@/presentation/styles/colors';

const styles = StyleSheet.create({
  text: {
    fontSize: layout.fontSize.normal,
    color: colors.black,
    fontFamily: layout.fontFamily.regular,
  },
});

export default styles;
