import { colors } from '@/presentation/styles/colors';
import { layout } from '@/presentation/styles/layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    flex: 1,
    width: '70%',
    height: '100%',
    backgroundColor: colors.grey,
    borderTopLeftRadius: layout.spacing.large * 1.5,
    borderBottomLeftRadius: layout.spacing.large * 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  menuBox: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: layout.spacing.large * 1.5,
    borderBottomLeftRadius: layout.spacing.large * 1.5,
    padding: layout.spacing.large,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: layout.spacing.large,
    alignSelf: 'center',
    marginTop: layout.spacing.large,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.normal,
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: layout.fontSize.normal,
    fontFamily: layout.fontFamily.bold,
  },
  activeLabel: {
    color: colors.primary,
  },
  activeBar: {
    width: 2,
    height: '150%',
    backgroundColor: colors.primary,
  },
});

export default styles;
