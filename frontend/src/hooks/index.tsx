import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { UserProvider } from './modules/user';
import { CityProvider } from './modules/city';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>
        <CityProvider>{children}</CityProvider>
      </UserProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
