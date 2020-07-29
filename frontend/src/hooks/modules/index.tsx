import React from 'react';

import { UserProvider } from './user';
import { CityProvider } from './city';
import { HolidayProvider } from './holiday';
import { ModalProvider } from './modal';

const ModulesProvider: React.FC = ({ children }) => (
  <UserProvider>
    <CityProvider>
      <HolidayProvider>
        <ModalProvider>{children}</ModalProvider>
      </HolidayProvider>
    </CityProvider>
  </UserProvider>
);

export default ModulesProvider;
