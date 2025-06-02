import { colors } from '@/presentation/styles/colors';
import { getSize, layout } from '@/presentation/styles/layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: layout.spacing.normal,
    paddingHorizontal: layout.spacing.large,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.normal,
  },
  title: {
    fontSize: layout.fontSize.regular,
    fontFamily: layout.fontFamily.bold,
    color: colors.white,
  },
  inputRounded: {
    height: getSize(40),
    borderRadius: layout.borderRadius * 4,
    fontSize: layout.fontSize.normal,
    fontFamily: layout.fontFamily.bold,
    color: colors.white,
  },
  button: {
    width: '100%',
    height: getSize(36),
    borderRadius: layout.borderRadius * 2,
    marginVertical: layout.spacing.small,
  },
  txtButton: {
    fontSize: layout.fontSize.regular,
  },
});

export default styles;
