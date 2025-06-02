import { StyleSheet } from 'react-native';
import { layout } from '@/presentation/styles/layout';
import { colors } from '@/presentation/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.small,
    marginTop: layout.spacing.large,
  },
  paginationContainer: {
    marginTop: layout.spacing.small,
    marginBottom: layout.spacing.large,
  },
  titleDescription: {
    fontSize: layout.fontSize.large,
  },
  quantityText: {
    fontFamily: 'Inter_700Bold',
    fontSize: layout.fontSize.large,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontFamily: 'Inter_400Regular',
    color: colors.grey,
  },
  buttonContainer: {
    width: layout.screenWidth * 0.9,
    marginTop: layout.spacing.normal,
    marginBottom: layout.spacing.small,
  },
  buttonOutlined: {
    borderWidth: 1,
    borderColor: colors.primary,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: layout.spacing.regular,
  },
  paginationButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationButtonActive: {
    backgroundColor: colors.primary,
  },
  paginationText: {
    fontSize: 16,
    color: colors.black,
  },
  paginationTextActive: {
    color: colors.white,
  },
});

export default styles;
