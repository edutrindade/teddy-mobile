import { StyleSheet } from 'react-native';
import { colors } from '@/presentation/styles/colors';
import { layout } from '@/presentation/styles/layout';

export default StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: layout.spacing.regular,
    marginBottom: layout.spacing.large + 4,
  },
  paginationButton: {
    paddingHorizontal: layout.spacing.intermedium / 2,
    paddingVertical: layout.spacing.small / 2,
    borderRadius: layout.spacing.small / 2,
    marginHorizontal: layout.spacing.small / 2,
  },
  paginationButtonActive: {
    backgroundColor: colors.primary,
  },
  paginationText: {
    fontSize: layout.fontSize.normal,
  },
  paginationTextActive: {
    color: colors.white,
  },
});
