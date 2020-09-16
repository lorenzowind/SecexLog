import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface ProviderOperationsData {
  name: string;
  phone_number: string;
  email: string;
  modal_id: string;
  preference: 'CPF' | 'CNPJ';
  preference_data: string;
  created_At?: Date;
  updated_at?: Date;
}

export interface ProviderState extends ProviderOperationsData {
  id: string;
}

interface ProviderContextData {
  providers: ProviderState[];
  providersPage: number;
  incrementProvidersPage(): void;
  initializeProvidersPage(): void;
  getProviders(search: string, isPagination: boolean): Promise<void>;
  insertProvider(provider: ProviderOperationsData): Promise<void>;
  updateProvider(id: string, provider: ProviderOperationsData): Promise<void>;
  removeProvider(id: string): Promise<void>;
}

const ProviderContext = createContext<ProviderContextData>(
  {} as ProviderContextData,
);

const ProviderModuleProvider: React.FC = ({ children }) => {
  const [providers, setProviders] = useState<ProviderState[]>([]);
  const [providersPage, setProvidersPage] = useState(1);

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const incrementProvidersPage = useCallback(() => {
    setProvidersPage(providersPage + 1);
  }, [providersPage]);

  const initializeProvidersPage = useCallback(() => {
    setProvidersPage(1);
  }, []);

  const getProviders = useCallback(
    async (search: string, isPagination: boolean) => {
      try {
        const query = isPagination
          ? `providers/pagination/all?search=${search}&page=${providersPage}`
          : 'providers/all';

        const response = await api.get(query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setProviders(response.data);

          if (search && response.data.length === 0) {
            addToast({
              type: 'info',
              title: 'Nenhum prestador encontrado',
            });
          }
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na listagem',
          description: 'Ocorreu um erro na listagem dos prestadores.',
        });
      }
    },
    [addToast, providersPage, token],
  );

  const insertProvider = useCallback(
    async (provider: ProviderOperationsData) => {
      try {
        const response = await api.post('providers', provider, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Prestador criado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro na criação do prestador.',
        });
      }
    },
    [addToast, token, user],
  );

  const updateProvider = useCallback(
    async (id: string, provider: ProviderOperationsData) => {
      try {
        const response = await api.put(`providers/${id}`, provider, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Prestador alterado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro na alteração do prestador.',
        });
      }
    },
    [addToast, token, user],
  );

  const removeProvider = useCallback(
    async (id: string) => {
      try {
        const response = await api.delete(`providers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Prestador removido com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção do prestador.',
        });
      }
    },
    [addToast, token, user],
  );

  return (
    <ProviderContext.Provider
      value={{
        providers,
        providersPage,
        incrementProvidersPage,
        initializeProvidersPage,
        getProviders,
        insertProvider,
        removeProvider,
        updateProvider,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

function useProvider(): ProviderContextData {
  const context = useContext(ProviderContext);

  if (!context) {
    throw new Error(
      'useProvider must be used within an ProviderModuleProvider',
    );
  }

  return context;
}

export { ProviderModuleProvider, useProvider };
