import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { OpinionProvider } from './opinion';

import ModulesProvider from './modules';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <OpinionProvider>
        <ModulesProvider>{children}</ModulesProvider>
      </OpinionProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
