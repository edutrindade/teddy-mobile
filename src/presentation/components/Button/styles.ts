import { colors } from '@/presentation/styles/colors';
import { getSize, layout } from '@/presentation/styles/layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: getSize(52),
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.regular,
  },
  text: {
    fontSize: layout.fontSize.extraLarge,
    fontFamily: layout.fontFamily.bold,
    color: colors.white,
  },
  disabledButton: {
    backgroundColor: colors.light200,
  },
});

export default styles;
