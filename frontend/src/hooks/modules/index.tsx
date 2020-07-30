import React from 'react';

import { UserProvider } from './user';
import { CityProvider } from './city';
import { HolidayProvider } from './holiday';
import { ModalProvider } from './modal';
import { ProviderModuleProvider } from './provider';

const ModulesProvider: React.FC = ({ children }) => (
  <UserProvider>
    <CityProvider>
      <HolidayProvider>
        <ModalProvider>
          <ProviderModuleProvider>{children}</ProviderModuleProvider>
        </ModalProvider>
      </HolidayProvider>
    </CityProvider>
  </UserProvider>
);

export default ModulesProvider;
