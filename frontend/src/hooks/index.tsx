import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { OpinionProvider } from './opinion';
import { SearchResultProvider } from './searchResult';

import ModulesProvider from './modules';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <OpinionProvider>
        <SearchResultProvider>
          <ModulesProvider>{children}</ModulesProvider>
        </SearchResultProvider>
      </OpinionProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
