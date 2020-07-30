import React from 'react';

import { UserProvider } from './user';
import { CityProvider } from './city';
import { HolidayProvider } from './holiday';
import { ModalProvider } from './modal';
import { ProviderModuleProvider } from './provider';
import { PathProvider } from './path';

const ModulesProvider: React.FC = ({ children }) => (
  <UserProvider>
    <CityProvider>
      <HolidayProvider>
        <ModalProvider>
          <ProviderModuleProvider>
            <PathProvider>{children}</PathProvider>
          </ProviderModuleProvider>
        </ModalProvider>
      </HolidayProvider>
    </CityProvider>
  </UserProvider>
);

export default ModulesProvider;
