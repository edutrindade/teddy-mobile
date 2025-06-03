import { StyleSheet } from 'react-native';
import { colors } from '@/presentation/styles/colors';
import { layout } from '@/presentation/styles/layout';

export default StyleSheet.create({
  card: {
    width: layout.screenWidth * 0.9,
    backgroundColor: colors.white,
    padding: layout.spacing.normal,
    borderRadius: layout.borderRadius,
    marginBottom: layout.spacing.intermedium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.87,
    elevation: 3,
    alignItems: 'center',
    gap: layout.spacing.small,
  },
  name: {
    fontFamily: layout.fontFamily.bold,
    fontSize: layout.fontSize.regular,
  },
  detail: {
    fontFamily: layout.fontFamily.regular,
    fontSize: layout.fontSize.normal,
  },
  iconsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: layout.spacing.small - 2,
  },
  simpleCardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: layout.spacing.regular,
  },
});
