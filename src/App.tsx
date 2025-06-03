import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import Routes from './presentation/routes';
import { ToastProviderWrapper } from './presentation/components/ToastNotification';
import { ToastProvider } from 'react-native-toast-notifications';

function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return null;
}

export default function App() {
  const fontLoading = useCustomFonts();
  if (fontLoading) {
    return fontLoading;
  }

  return (
    <SafeAreaProvider>
      <ToastProvider placement="top" duration={2000}>
        <ToastProviderWrapper>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Routes />
          </GestureHandlerRootView>
        </ToastProviderWrapper>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
