import { StyleSheet } from 'react-native';
import { layout } from '@/presentation/styles/layout';

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: layout.spacing.large,
  },
});

export default styles;
