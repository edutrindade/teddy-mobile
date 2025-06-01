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
    backgroundColor: colors.primary,
    opacity: 0.5,
  },
  buttonOutlined: {
    width: '100%',
    borderWidth: 2,
    height: getSize(32),
    borderColor: colors.primary,
    borderRadius: layout.borderRadius,
    backgroundColor: colors.transparent,
    paddingHorizontal: layout.spacing.regular,
    paddingVertical: layout.spacing.small,
  },
  buttonOutlinedText: {
    fontSize: layout.fontSize.normal,
    fontFamily: layout.fontFamily.bold,
    color: colors.primary,
  },
});

export default styles;
