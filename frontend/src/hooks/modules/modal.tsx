import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface ModalOperationsData {
  name: string;
  image: string;
  is_safe: boolean;
  is_cheap: boolean;
  is_fast: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ModalState extends ModalOperationsData {
  id: number;
}

interface ModalContextData {
  modals: ModalState[];
  modalsPage: number;
  incrementModalsPage(): void;
  initializeModalsPage(): void;
  setSearchModals(searchCity: string): void;
  getModals(isPagination: boolean): Promise<void>;
  insertModal(modal: ModalOperationsData): Promise<void>;
  updateModal(id: number, modal: ModalOperationsData): Promise<void>;
  removeModal(id: number): Promise<void>;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);
  const [modalsPage, setModalsPage] = useState(1);
  const [search, setSearch] = useState('');

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const incrementModalsPage = useCallback(() => {
    setModalsPage(modalsPage + 1);
  }, [modalsPage]);

  const initializeModalsPage = useCallback(() => {
    setModalsPage(1);
  }, []);

  const setSearchModals = useCallback(searchModal => {
    setSearch(searchModal);
  }, []);

  const getModals = useCallback(
    async (isPagination: boolean) => {
      try {
        const query = isPagination
          ? `modals/pagination/all?search=${search}&page=${modalsPage}`
          : 'modals/all';

        const response = await api.get(query, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
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
    },
    [addToast, modalsPage, search, token],
  );

  const insertModal = useCallback(
    async (modal: ModalOperationsData) => {
      try {
        const response = await api.post('modals', modal, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  const updateModal = useCallback(
    async (id: number, modal: ModalOperationsData) => {
      try {
        const response = await api.put(`modals/${id}`, modal, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  const removeModal = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`modals/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  return (
    <ModalContext.Provider
      value={{
        modals,
        modalsPage,
        incrementModalsPage,
        initializeModalsPage,
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
