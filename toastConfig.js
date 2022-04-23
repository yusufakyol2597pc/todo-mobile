import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#B52C46', height: "100%", alignItems: "#CCBFA3" }}
        contentContainerStyle={{ paddingHorizontal: 15}}
        text1NumberOfLines={5}
        text1Style={{fontFamily: 'pressura-mono', fontSize: 14, paddingVertical: 16}}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: '#B52C46', height: "100%", alignItems: "center" }}
        contentContainerStyle={{ paddingHorizontal: 15}}
        text1NumberOfLines={5}
        text1Style={{fontFamily: 'pressura-mono', fontSize: 14, paddingVertical: 16}}
      />
    ),
  };