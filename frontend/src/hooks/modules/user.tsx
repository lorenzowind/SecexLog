import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface UserOperationsData {
  name: string;
  login: string;
  email: string;
  position: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserState extends UserOperationsData {
  id: string;
}

interface UserContextData {
  users: UserState[];
  getUsers(search: string): Promise<void>;
  insertUser(newUser: UserOperationsData): Promise<void>;
  updateUser(id: string, newUser: UserOperationsData): Promise<void>;
  removeUser(id: string): Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<UserState[]>([]);

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const getUsers = useCallback(
    async (search: string) => {
      try {
        const query = `users/all?search=${search}`;

        const response = await api.get(query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setUsers(response.data);

          if (search && response.data.length === 0) {
            addToast({
              type: 'info',
              title: 'Nenhum usuário encontrado',
            });
          }
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na listagem',
          description: 'Ocorreu um erro na listagem dos usuários.',
        });
      }
    },
    [addToast, token],
  );

  const insertUser = useCallback(
    async (newUser: UserOperationsData) => {
      try {
        const response = await api.post('users', newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  const updateUser = useCallback(
    async (id: string, newUser: UserOperationsData) => {
      try {
        const response = await api.put(`users/${id}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  const removeUser = useCallback(
    async (id: string) => {
      try {
        const response = await api.delete(`users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
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
