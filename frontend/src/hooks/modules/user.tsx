import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface UserOperationsData {
  nome: string;
  login: string;
  email: string;
  cargo: string;
  senha: string;
}

export interface UserState extends UserOperationsData {
  id: number;
}

interface UserContextData {
  users: UserState[];
  clearUsers(): void;
  getUsers(): Promise<void>;
  getUsersByName(nome: string): Promise<void>;
  insertUser(user: UserOperationsData): Promise<void>;
  updateUser(id: number, user: UserOperationsData): Promise<void>;
  removeUser(id: number): Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<UserState[]>([]);

  const { token } = useAuth();
  const { addToast } = useToast();

  const clearUsers = useCallback(() => {
    setUsers([]);
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const response = await api.get('users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setUsers(response.data);
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na listagem',
        description: 'Ocorreu um erro na listagem dos usuários.',
      });
    }
  }, [addToast, token]);

  const getUsersByName = useCallback(async (nome: string) => {
    console.log('Working...');
  }, []);

  const insertUser = useCallback(
    async (user: UserOperationsData) => {
      try {
        const response = await api.post('users', user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Usuário criado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro na criação do usuário.',
        });
      }
    },
    [addToast, token],
  );

  const updateUser = useCallback(
    async (id: number, user: UserOperationsData) => {
      try {
        const response = await api.put(`users/${id}`, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Usuário alterado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro na alteração do usuário.',
        });
      }
    },
    [addToast, token],
  );

  const removeUser = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Usuário removido com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção do usuário.',
        });
      }
    },
    [addToast, token],
  );

  return (
    <UserContext.Provider
      value={{
        users,
        clearUsers,
        getUsers,
        getUsersByName,
        insertUser,
        removeUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
}

export { UserProvider, useUser };
