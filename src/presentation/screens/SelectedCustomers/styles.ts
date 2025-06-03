import { StyleSheet } from 'react-native';
import { layout } from '@/presentation/styles/layout';
import { colors } from '@/presentation/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: layout.spacing.large,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.small,
    marginVertical: layout.spacing.large,
  },
  titleDescription: {
    fontSize: layout.fontSize.intermedium,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: layout.spacing.large * 3,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontFamily: layout.fontFamily.regular,
    color: colors.grey,
  },
  buttonContainer: {
    width: layout.screenWidth * 0.9,
    marginTop: layout.spacing.normal,
    marginBottom: layout.spacing.large,
  },
});

export default styles;
