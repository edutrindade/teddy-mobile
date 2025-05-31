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
    alignItems: 'center',
    paddingHorizontal: layout.spacing.regular,
  },
  logoContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  logo: {
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
  },
});

export default styles;
