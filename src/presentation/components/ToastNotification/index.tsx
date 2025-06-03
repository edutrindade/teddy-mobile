import React, { createContext, useContext } from 'react';
import { ToastProvider, useToast, ToastOptions } from 'react-native-toast-notifications';

const ToastContext = createContext<{
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
} | null>(null);

export const ToastProviderWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const toast = useToast();

  const showSuccess = (message: string) => {
    toast.show(message, { type: 'success' } as ToastOptions);
  };

  const showInfo = (message: string) => {
    toast.show(message, { type: 'normal' } as ToastOptions);
  };

  const showError = (message: string) => {
    toast.show(message, { type: 'danger' } as ToastOptions);
  };

  const showWarning = (message: string) => {
    toast.show(message, { type: 'warning' } as ToastOptions);
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showInfo, showError, showWarning }}>
      <ToastProvider placement="top" duration={3000}>
        {children}
      </ToastProvider>
    </ToastContext.Provider>
  );
};

export const useToastNotifications = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastNotifications must be used within a ToastProviderWrapper');
  }
  return context;
};
