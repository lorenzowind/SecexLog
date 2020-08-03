import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface ModalOperationsData {
  name: string;
  safety: boolean;
  cost: boolean;
  fast: boolean;
  imgUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModalState extends ModalOperationsData {
  id: number;
}

interface ModalContextData {
  modals: ModalState[];
  setSearchModals(searchCity: string): void;
  getModals(): Promise<void>;
  insertModal(modal: ModalOperationsData): Promise<void>;
  updateModal(id: number, modal: ModalOperationsData): Promise<void>;
  removeModal(id: number): Promise<void>;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);
  const [search, setSearch] = useState('');

  const { token } = useAuth();
  const { addToast } = useToast();

  const setSearchModals = useCallback(searchModal => {
    setSearch(searchModal);
  }, []);

  const getModals = useCallback(async () => {
    try {
      const query = search ? `modals/${search}` : 'modals';

      const response = await api.get(query, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setModals(response.data);

        if (search && response.data.length === 0) {
          addToast({
            type: 'info',
            title: 'Nenhum modal encontrado',
          });
        }
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na listagem',
        description: 'Ocorreu um erro na listagem dos modais.',
      });
    }
  }, [addToast, search, token]);

  const insertModal = useCallback(
    async (modal: ModalOperationsData) => {
      try {
        const response = await api.post('modals', modal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Modal criado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro na criação do modal.',
        });
      }
    },
    [addToast, token],
  );

  const updateModal = useCallback(
    async (id: number, modal: ModalOperationsData) => {
      try {
        const response = await api.put(`modals/${id}`, modal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Modal alterado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro na alteração do modal.',
        });
      }
    },
    [addToast, token],
  );

  const removeModal = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`modals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Modal removido com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção do modal.',
        });
      }
    },
    [addToast, token],
  );

  return (
    <ModalContext.Provider
      value={{
        modals,
        setSearchModals,
        getModals,
        insertModal,
        removeModal,
        updateModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };
