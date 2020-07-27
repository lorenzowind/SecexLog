import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { UserProvider } from './modules/user';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>{children}</UserProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
