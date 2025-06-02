import { StyleSheet } from 'react-native';
import { layout } from '@/presentation/styles/layout';
import { colors } from '@/presentation/styles/colors';

const styles = StyleSheet.create({
  container: {
    width: layout.screenWidth,
    height: layout.headerHeight,
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: layout.elevation.default,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: layout.spacing.regular,
  },
  logoContainer: {
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: layout.spacing.small,
  },
  logo: {
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
  },
});

export default styles;
