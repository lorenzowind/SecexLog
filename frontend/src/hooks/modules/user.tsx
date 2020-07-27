import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface UserCreatingAndUpdatingData {
  nome: string;
  login: string;
  email: string;
  cargo: string;
  senha: string;
}

export interface UserState extends UserCreatingAndUpdatingData {
  id: number;
}

interface UserContextData {
  users: UserState[];
  clearUsers(): void;
  getUsers(): Promise<void>;
  insertUser(user: UserCreatingAndUpdatingData): Promise<void>;
  updateUser(id: string, user: UserCreatingAndUpdatingData): Promise<void>;
  removeUser(id: string): Promise<void>;
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
    console.log('Working...');
  }, []);

  const insertUser = useCallback(async (user: UserCreatingAndUpdatingData) => {
    console.log('Working...');
  }, []);

  const updateUser = useCallback(
    async (id: string, user: UserCreatingAndUpdatingData) => {
      console.log('Working...');
    },
    [],
  );

  const removeUser = useCallback(async (id: string) => {
    console.log('Working...');
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        clearUsers,
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
