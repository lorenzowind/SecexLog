import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { UserProvider } from './modules/user';
import { CityProvider } from './modules/city';
import { HolidayProvider } from './modules/holiday';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>
        <CityProvider>
          <HolidayProvider>{children}</HolidayProvider>
        </CityProvider>
      </UserProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
