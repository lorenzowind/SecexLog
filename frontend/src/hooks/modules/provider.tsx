import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface ProviderOperationsData {
  nome: string;
  telefone: string;
  email: string;
  modal: string;
  preference: 'CPF' | 'CNPJ';
  preferenceTxt: string;
}

export interface ProviderState extends ProviderOperationsData {
  id: number;
}

interface ProviderContextData {
  providers: ProviderState[];
  setSearchProviders(searchProvider: string): void;
  getProviders(): Promise<void>;
  insertProvider(provider: ProviderOperationsData): Promise<void>;
  updateProvider(id: number, provider: ProviderOperationsData): Promise<void>;
  removeProvider(id: number): Promise<void>;
}

const ProviderContext = createContext<ProviderContextData>(
  {} as ProviderContextData,
);

const ProviderModuleProvider: React.FC = ({ children }) => {
  const [providers, setProviders] = useState<ProviderState[]>([]);
  const [search, setSearch] = useState('');

  const { token } = useAuth();
  const { addToast } = useToast();

  const setSearchProviders = useCallback(searchProvider => {
    setSearch(searchProvider);
  }, []);

  const getProviders = useCallback(async () => {
    try {
      const query = search ? `providers/${search}` : 'providers';

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
  }, [addToast, search, token]);

  const insertProvider = useCallback(
    async (provider: ProviderOperationsData) => {
      try {
        const response = await api.post('providers', provider, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  const updateProvider = useCallback(
    async (id: number, provider: ProviderOperationsData) => {
      try {
        const response = await api.put(`providers/${id}`, provider, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  const removeProvider = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`providers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  return (
    <ProviderContext.Provider
      value={{
        providers,
        setSearchProviders,
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
