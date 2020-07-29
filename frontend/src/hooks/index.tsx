import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { OpinionProvider } from './opinion';

import { UserProvider } from './modules/user';
import { CityProvider } from './modules/city';
import { HolidayProvider } from './modules/holiday';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <OpinionProvider>
        <UserProvider>
          <CityProvider>
            <HolidayProvider>{children}</HolidayProvider>
          </CityProvider>
        </UserProvider>
      </OpinionProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
