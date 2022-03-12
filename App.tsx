import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import { Provider } from 'react-redux'
import store from './store/rootReducer';
import AuthController from './screens/login/AuthController';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import ConfirmDialog from './shared-components/ConfirmDialog';

axios.defaults.baseURL = 'http://192.168.1.201:3000';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthController/>
          <StatusBar />
          <ConfirmDialog/>
        </Provider>
        <Toast />
      </SafeAreaProvider>
    );
  }
}
