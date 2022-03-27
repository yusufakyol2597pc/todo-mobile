import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import { Provider } from 'react-redux'
import store from './store/rootReducer';
import AuthController from './screens/login/AuthController';
import Toast from 'react-native-toast-message';
import ConfirmDialog from './shared-components/ConfirmDialog';
import { Host, Portal } from 'react-native-portalize';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './assets/lang/en.json'
import tr from './assets/lang/tr.json'

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: en,
  tr: tr,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
        <Host>
          <AuthController/>
          <StatusBar />
          <ConfirmDialog/>
        </Host>
        </Provider>
        <Toast />
      </SafeAreaProvider>
    );
  }
}
