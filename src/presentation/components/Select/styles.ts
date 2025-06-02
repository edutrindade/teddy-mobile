import { StyleSheet } from 'react-native';
import { colors } from '@/presentation/styles/colors';
import { getSize, layout } from '@/presentation/styles/layout';

export default StyleSheet.create({
  selectContainer: {
    height: getSize(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.spacing.small / 2,
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: layout.spacing.small,
  },
  selectText: {
    fontSize: layout.fontSize.normal,
    marginRight: layout.spacing.normal,
  },
  icon: {
    marginLeft: layout.spacing.small,
    color: colors.grey,
    position: 'absolute',
    right: layout.spacing.small / 2,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    opacity: 0.95,
    paddingHorizontal: layout.spacing.large * 2,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius,
    paddingVertical: layout.spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    paddingVertical: layout.spacing.small,
    paddingHorizontal: layout.spacing.normal,
  },
  optionText: {
    fontSize: layout.fontSize.large,
    fontFamily: layout.fontFamily.bold,
    textAlign: 'center',
  },
});
