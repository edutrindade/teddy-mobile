import { StyleSheet } from 'react-native';
import { colors } from '@/presentation/styles/colors';
import { getSize, layout } from '@/presentation/styles/layout';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: layout.spacing.regular,
  },
  label: {
    fontSize: layout.fontSize.normal,
    marginBottom: 4,
    color: colors.white,
  },
  input: {
    height: getSize(52),
    borderWidth: 2,
    borderColor: colors.light200,
    borderRadius: layout.borderRadius,
    paddingHorizontal: layout.spacing.normal,
    fontSize: layout.fontSize.extraLarge,
    backgroundColor: colors.transparent,
    fontFamily: layout.fontFamily.regular,
  },
});

export default styles;
